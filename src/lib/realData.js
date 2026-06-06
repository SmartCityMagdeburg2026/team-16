/**
 * realData.js — Processed data from Magdeburg open data (KISS-MD + Mietspiegel 2024)
 * All transforms are pure functions over the raw JSON rows.
 */

import populationMonthlyRaw  from "../../data/kiss-md/json/bevoelkerung/bevoelkerungsbestand-monatlich.json";
import birthsDeathsRaw       from "../../data/kiss-md/json/bevoelkerung/natuerliche-bewegungen-der-hauptwohnsitzbevoelkerung.json";
import pm10Raw               from "../../data/kiss-md/json/energie-und-umwelt/jahresmittelwerte-der-feinstaubpartikel-pm10.json";
import transitRaw            from "../../data/kiss-md/json/verkehr/befoerderte-personen-der-magdeburger-verkehrsbetriebe-gmbh-und-co-kg.json";
import studentsRaw           from "../../data/kiss-md/json/bildung-und-kultur/studierende-an-den-hochschulen-im-wintersemester.json";
import employmentRaw         from "../../data/kiss-md/json/arbeitsmarkt/sozialversicherungspflichtig-beschaeftigte-am-arbeitsort-nach-geschlecht-altersklassen-und-staatsangehoerigkeit.json";
import rentRaw               from "../../data/mietspiegel-2024/nach-wohnflaeche.json";

// ── 1. Population: December end-of-year snapshots 1993–2024 ──────────────────
// var3 = male (Hauptwohnsitz), var4 = female, var5 = total
export const realPopulation = populationMonthlyRaw.rows
  .filter(r => r.var2 === "Dezember")
  .map(r => ({ year: r.var1, total: r.var5, male: r.var3, female: r.var4 }))
  .sort((a, b) => a.year - b.year);

// ── 2. Births & Deaths 2000–2024 ─────────────────────────────────────────────
// var2 = live births, var5 = deaths
export const realBirthsDeaths = birthsDeathsRaw.rows
  .map(r => ({
    year: r.var1,
    births: r.var2,
    deaths: r.var5,
    balance: r.var2 - r.var5,
  }))
  .sort((a, b) => a.year - b.year);

// ── 3. PM10 Annual Averages 2001–2023 ────────────────────────────────────────
// Multiple measurement stations; take average of all non-null readings per year
export const realPM10 = pm10Raw.rows
  .map(r => {
    const vals = [r.var2, r.var3, r.var4, r.var5, r.var6, r.var7]
      .filter(v => v != null);
    if (vals.length === 0) return null;
    const avg = Math.round(vals.reduce((s, v) => s + v, 0) / vals.length);
    const max = Math.max(...vals);
    const min = Math.min(...vals);
    return { year: r.var1, avg, max, min };
  })
  .filter(Boolean)
  .sort((a, b) => a.year - b.year);

// ── 4. MVB Public Transit — Annual Passengers 1991–2021 ──────────────────────
// var2 = total passengers (all modes)
export const realTransit = transitRaw.rows
  .map(r => ({
    year: r.var1,
    passengers: Math.round(r.var2 / 1e6 * 10) / 10, // in millions, 1 decimal
  }))
  .sort((a, b) => a.year - b.year);

// ── 5. University Students (winter semester) 1994–2024 ───────────────────────
// var3 is total (larger of the two main figures, includes all enrolled)
export const realStudents = studentsRaw.rows
  .map(r => ({
    year: r.var1,
    total: r.var3,
    domestic: r.var4,
    foreign:  r.var5,
  }))
  .sort((a, b) => a.year - b.year);

// ── 6. Insured Employees at Workplace 2016–2023 ──────────────────────────────
// var2 = total, var3 = male, var4 = female, var13 = foreign nationals
export const realEmployment = employmentRaw.rows
  .map(r => ({
    year:    r.var1,
    total:   r.var2,
    male:    r.var3,
    female:  r.var4,
    foreign: r.var13,
  }))
  .sort((a, b) => a.year - b.year);

// ── 7. Rent per m² by Year (Mietspiegel 2012–2024) ──────────────────────────
// Average across all districts + flat size classes, excluding null samples
export const realRentPerSqm = (() => {
  const byYear = {};
  for (const row of rentRaw.rows) {
    if (row.nettokaltmiete_pro_qm == null) continue;
    if (!byYear[row.year]) byYear[row.year] = { sum: 0, n: 0 };
    byYear[row.year].sum += row.nettokaltmiete_pro_qm;
    byYear[row.year].n   += 1;
  }
  return Object.entries(byYear)
    .filter(([y]) => parseInt(y) <= 2024)         // drop forecast years
    .map(([year, { sum, n }]) => ({
      year: parseInt(year),
      avgPerSqm: Math.round((sum / n) * 100) / 100,
    }))
    .sort((a, b) => a.year - b.year);
})();

// ── 8. Rent by district (latest year = 2024) ────────────────────────────────
export const realRentByDistrict = (() => {
  const latest = 2024;
  const byDistrict = {};
  for (const row of rentRaw.rows) {
    if (row.year !== latest || row.nettokaltmiete_pro_qm == null) continue;
    if (!byDistrict[row.stadtteil]) byDistrict[row.stadtteil] = { sum: 0, n: 0 };
    byDistrict[row.stadtteil].sum += row.nettokaltmiete_pro_qm;
    byDistrict[row.stadtteil].n   += 1;
  }
  return Object.entries(byDistrict)
    .map(([name, { sum, n }]) => ({
      name,
      avgPerSqm: Math.round((sum / n) * 100) / 100,
    }))
    .sort((a, b) => b.avgPerSqm - a.avgPerSqm);  // highest rent first
})();
