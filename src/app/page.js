"use client";

import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import Link from "next/link";
import {
  Users, Buildings, Train, Leaf, ChartBar, GraduationCap,
  MapPin, Church, ArrowRight, Star, Drop, Lightning,
  Clock, Trophy, Palette, Flask, Tree, Bicycle,
} from "@phosphor-icons/react";

const SECTION_ICONS = [Users, Buildings, Train, Leaf, ChartBar, GraduationCap];
const SECTION_ACCENTS = ["#10B981", "#2563EB", "#06B6D4", "#10B981", "#EF4444", "#2563EB"];
const SECTION_BGS = ["rgba(16,185,129,0.08)", "rgba(37,99,235,0.08)", "rgba(6,182,212,0.08)", "rgba(16,185,129,0.08)", "rgba(239,68,68,0.08)", "rgba(37,99,235,0.08)"];

const CITY_LIFE_ICONS = [Palette, Trophy, Flask];
const CITY_LIFE_STYLES = [
  { accent: "#2563EB", bg: "rgba(37,99,235,0.08)",  border: "rgba(37,99,235,0.20)",  img: "https://picsum.photos/seed/opera-theatre/500/260"     },
  { accent: "#EF4444", bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.20)",  img: "https://picsum.photos/seed/sports-stadium/500/260"    },
  { accent: "#10B981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.20)", img: "https://picsum.photos/seed/university-campus/500/260" },
];

const HIGHLIGHT_ICONS = [Church, Buildings, Drop, Lightning];
const HIGHLIGHT_STYLES = [
  { accent: "#2563EB", bg: "rgba(37,99,235,0.07)",  border: "rgba(37,99,235,0.20)",  img: "https://picsum.photos/seed/magdeburg-dom-cathedral/700/380"    },
  { accent: "#10B981", bg: "rgba(16,185,129,0.07)", border: "rgba(16,185,129,0.20)", img: "https://picsum.photos/seed/hundertwasser-pink/700/380"          },
  { accent: "#06B6D4", bg: "rgba(6,182,212,0.07)",  border: "rgba(6,182,212,0.20)",  img: "https://picsum.photos/seed/elbe-river-city/700/380"             },
  { accent: "#10B981", bg: "rgba(16,185,129,0.07)", border: "rgba(16,185,129,0.20)", img: "https://picsum.photos/seed/vacuum-science-experiment/700/380"   },
];

const GALLERY_IMGS = [
  "https://picsum.photos/seed/gothic-cathedral/600/400",
  "https://picsum.photos/seed/colorful-building/600/400",
  "https://picsum.photos/seed/river-promenade/600/400",
];
const GALLERY_ACCENTS = ["#2563EB", "#10B981", "#06B6D4"];

const FACT_ICONS = [MapPin, Tree, Bicycle, Lightning];
const FACT_VALUES = ["Elbe River, 52°N", "~100 km² parks", "300+ km routes", "Guericke's city"];

export default function HomePage() {
  const { lang } = useLang();
  const tr = translations[lang].home;

  return (
    <div className="page-fade-in">

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ minHeight: 520 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://picsum.photos/seed/magdeburg-river-skyline/1400/520"
          alt="Magdeburg city panorama"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(105deg, rgba(30,15,5,0.88) 0%, rgba(30,15,5,0.65) 55%, rgba(30,15,5,0.25) 100%)" }}
        />
        <div className="relative flex items-center" style={{ minHeight: 520 }}>
          <div className="px-8 lg:px-14 py-16 max-w-2xl">
            <div className="flex items-center gap-2 mb-5">
              <MapPin size={14} weight="fill" style={{ color: "#3B82F6" }} />
              <span style={{ color: "#3B82F6", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {tr.heroLocation}
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(40px, 6vw, 60px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              {tr.heroTitle1}<br />
              <span style={{ background: "linear-gradient(135deg, #2563EB, #06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {tr.heroTitle2}
              </span>
            </h1>
            <p style={{ color: "rgba(251,247,238,0.72)", fontSize: 16, marginTop: 18, lineHeight: 1.65, maxWidth: 460 }}>
              {tr.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              {tr.heroStats.map(s => (
                <div key={s.l} style={{ background: "rgba(251,247,238,0.10)", border: "1px solid rgba(251,247,238,0.18)", borderRadius: 10, padding: "10px 18px", backdropFilter: "blur(8px)" }}>
                  <p style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 700, lineHeight: 1 }}>{s.v}</p>
                  <p style={{ color: "rgba(251,247,238,0.55)", fontSize: 11, marginTop: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.l}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/overview" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all"
                style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)", boxShadow: "0 4px 16px rgba(37,99,235,0.40)" }}>
                {tr.heroCta1} <ArrowRight size={14} />
              </Link>
              <Link href="#about" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all"
                style={{ color: "#FFFFFF", background: "rgba(251,247,238,0.12)", border: "1px solid rgba(251,247,238,0.22)", backdropFilter: "blur(8px)" }}>
                {tr.heroCta2}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Page content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12 space-y-16">

        {/* QUICK STATS */}
        <section>
          <p className="text-[11px] font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.glanceLabel}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {tr.quickStats.map((s) => (
              <div key={s.label} className="rounded-xl p-4 text-center"
                style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(148,163,184,0.20)", boxShadow: "0 1px 3px rgba(148,163,184,0.10)" }}>
                <p className="text-[18px] font-bold leading-tight" style={{ color: "#0F172A" }}>{s.value}</p>
                <p className="text-[11px] font-semibold mt-0.5" style={{ color: "#2563EB" }}>{s.label}</p>
                <p className="text-[10px] mt-0.5 leading-snug" style={{ color: "rgba(15,23,42,0.44)" }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PHOTO GALLERY */}
        <section>
          <p className="text-[11px] font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.landmarksLabel}</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {tr.gallery.map((g, i) => (
              <div key={g.label} className="rounded-2xl overflow-hidden relative"
                style={{ border: "1px solid rgba(148,163,184,0.20)", boxShadow: "0 2px 8px rgba(148,163,184,0.12)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={GALLERY_IMGS[i]} alt={g.label} className="w-full object-cover" style={{ height: 200 }} loading="lazy" />
                <div className="absolute bottom-0 left-0 right-0 p-4"
                  style={{ background: "linear-gradient(to top, rgba(20,10,0,0.82) 0%, transparent 100%)" }}>
                  <p className="text-[14px] font-bold" style={{ color: "#FFFFFF" }}>{g.label}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "rgba(251,247,238,0.65)" }}>{g.sub}</p>
                </div>
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{ background: "rgba(20,10,0,0.55)", color: "#FFFFFF", border: "1px solid rgba(251,247,238,0.20)" }}>
                  Magdeburg
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT THE CITY */}
        <section id="about">
          <p className="text-[11px] font-bold tracking-widest uppercase mb-6" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.aboutLabel}</p>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(148,163,184,0.20)", boxShadow: "0 4px 16px rgba(148,163,184,0.13)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://picsum.photos/seed/german-city-river/640/440" alt="Magdeburg city and Elbe River" className="w-full object-cover" style={{ height: 420 }} loading="lazy" />
              <div className="p-4" style={{ background: "rgba(255,255,255,0.92)" }}>
                <p className="text-[12px] font-semibold" style={{ color: "#2563EB" }}>{tr.aboutCaption1}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "rgba(15,23,42,0.54)" }}>{tr.aboutCaption2}</p>
              </div>
            </div>
            <div className="space-y-5">
              <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#0F172A" }}>{tr.aboutTitle}</h2>
              <p className="text-[14px] leading-relaxed" style={{ color: "rgba(15,23,42,0.72)" }}>{tr.aboutP1}</p>
              <p className="text-[14px] leading-relaxed" style={{ color: "rgba(15,23,42,0.72)" }}>{tr.aboutP2}</p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {tr.factLabels.map((label, i) => {
                  const Icon = FACT_ICONS[i];
                  return (
                    <div key={label} className="rounded-xl p-3 flex items-center gap-3"
                      style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(148,163,184,0.18)" }}>
                      <Icon size={16} weight="fill" style={{ color: "#2563EB", flexShrink: 0 }} />
                      <div>
                        <p className="text-[11px] font-semibold" style={{ color: "#2563EB" }}>{label}</p>
                        <p className="text-[12px] font-bold" style={{ color: "#0F172A" }}>{FACT_VALUES[i]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* HISTORY TIMELINE */}
        <section>
          <p className="text-[11px] font-bold tracking-widest uppercase mb-6" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.historyLabel}</p>
          <h2 className="text-2xl font-bold mb-8" style={{ color: "#0F172A" }}>{tr.historyTitle}</h2>
          <div className="relative">
            <div className="absolute left-[18px] top-0 bottom-0 w-[2px]"
              style={{ background: "linear-gradient(to bottom, #2563EB, rgba(37,99,235,0.10))" }} />
            <div className="space-y-6 pl-12">
              {tr.timeline.map((t, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[42px] top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                    style={{ background: "#EFF6FF", borderColor: t.accent, boxShadow: "0 0 0 3px rgba(255,255,255,1)" }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: t.accent }} />
                  </div>
                  <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(148,163,184,0.18)" }}>
                    <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                      <span className="text-[12px] font-bold px-2.5 py-0.5 rounded-full"
                        style={{ background: `${t.accent}15`, color: t.accent, border: `1px solid ${t.accent}30` }}>
                        {t.year}
                      </span>
                      <p className="text-[15px] font-bold" style={{ color: "#0F172A" }}>{t.title}</p>
                    </div>
                    <p className="text-[13.5px] leading-relaxed" style={{ color: "rgba(15,23,42,0.68)" }}>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DISTRICTS */}
        <section>
          <p className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.neighbourhoodsLabel}</p>
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#0F172A" }}>{tr.neighbourhoodsTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tr.districts.map((d, i) => {
              const imgs = [
                "https://picsum.photos/seed/old-town-square/400/220",
                "https://picsum.photos/seed/creative-urban/400/220",
                "https://picsum.photos/seed/tree-lined-street/400/220",
                "https://picsum.photos/seed/european-neighbourhood/400/220",
                "https://picsum.photos/seed/riverside-park/400/220",
                "https://picsum.photos/seed/modern-city-blocks/400/220",
              ];
              return (
                <div key={d.name} className="rounded-2xl overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(148,163,184,0.20)", boxShadow: "0 2px 8px rgba(148,163,184,0.10)" }}>
                  <div className="relative overflow-hidden" style={{ height: 160 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgs[i]} alt={d.name} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,10,0,0.55) 0%, transparent 60%)" }} />
                    <span className="absolute bottom-3 left-3 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(251,247,238,0.85)", color: d.tagColor, border: `1px solid ${d.tagColor}44` }}>
                      {d.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-[15px] font-bold" style={{ color: "#0F172A" }}>{d.name}</p>
                    <p className="text-[11px] font-medium mb-2" style={{ color: d.tagColor }}>{d.eng}</p>
                    <p className="text-[12.5px] leading-relaxed" style={{ color: "rgba(15,23,42,0.65)" }}>{d.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CITY LIFE */}
        <section>
          <p className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.cityLifeLabel}</p>
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#0F172A" }}>{tr.cityLifeTitle}</h2>
          <div className="grid lg:grid-cols-3 gap-5">
            {tr.cityLife.map((c, i) => {
              const Icon = CITY_LIFE_ICONS[i];
              const { accent, bg, border, img } = CITY_LIFE_STYLES[i];
              return (
                <div key={c.label} className="rounded-2xl overflow-hidden" style={{ background: bg, border: `1px solid ${border}` }}>
                  <div className="relative overflow-hidden" style={{ height: 180 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={c.label} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,5,0,0.65) 0%, transparent 60%)" }} />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.85)", border: `1px solid ${border}` }}>
                        <Icon size={15} weight="fill" style={{ color: accent }} />
                      </div>
                      <p className="text-[14px] font-bold" style={{ color: "#0F172A" }}>{c.label}</p>
                    </div>
                    <ul className="space-y-1.5">
                      {c.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: accent }} />
                          <p className="text-[12.5px] leading-snug" style={{ color: "rgba(15,23,42,0.70)" }}>{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CITY HIGHLIGHTS */}
        <section>
          <p className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.mustSeeLabel}</p>
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#0F172A" }}>{tr.mustSeeTitle}</h2>
          <div className="space-y-5">
            {tr.highlights.map((h, i) => {
              const Icon = HIGHLIGHT_ICONS[i];
              const { accent, bg, border, img } = HIGHLIGHT_STYLES[i];
              return (
                <div key={h.title} className="rounded-2xl overflow-hidden" style={{ background: bg, border: `1px solid ${border}` }}>
                  <div className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    <div className="lg:w-2/5 shrink-0 overflow-hidden" style={{ minHeight: 220 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={h.title} className="w-full h-full object-cover" style={{ minHeight: 220 }} loading="lazy" />
                    </div>
                    <div className="p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: "rgba(255,255,255,0.88)", border: `1px solid ${border}` }}>
                          <Icon size={17} weight="fill" style={{ color: accent }} />
                        </div>
                        <div>
                          <p className="text-[16px] font-bold" style={{ color: "#0F172A" }}>{h.title}</p>
                          <p className="text-[11px] font-semibold" style={{ color: accent }}>{h.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-[13.5px] leading-relaxed" style={{ color: "rgba(15,23,42,0.68)" }}>{h.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* EXPLORE CITY DATA */}
        <section>
          <p className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.openDataLabel}</p>
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#0F172A" }}>{tr.openDataTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tr.sections.map((s, i) => {
              const Icon = SECTION_ICONS[i];
              const accent = SECTION_ACCENTS[i];
              const bg = SECTION_BGS[i];
              return (
                <Link key={s.href} href={s.href}
                  className="group rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-md"
                  style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(148,163,184,0.20)", boxShadow: "0 1px 3px rgba(148,163,184,0.09)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg, border: `1px solid ${accent}33` }}>
                    <Icon size={17} weight="fill" style={{ color: accent }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-semibold" style={{ color: "#0F172A" }}>{s.label}</p>
                    <p className="text-[12px] mt-1 leading-relaxed" style={{ color: "rgba(15,23,42,0.56)" }}>{s.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[12px] font-medium" style={{ color: accent }}>
                    {tr.exploreLabel} <ArrowRight size={12} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* DID YOU KNOW */}
        <section>
          <div className="rounded-2xl p-6 lg:p-8" style={{ background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.22)" }}>
            <div className="flex items-center gap-2 mb-5">
              <Star size={15} weight="fill" style={{ color: "#2563EB" }} />
              <p className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "#2563EB" }}>{tr.didYouKnow}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {tr.funFacts.map((fact, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#2563EB" }} />
                  <p className="text-[13px] leading-relaxed" style={{ color: "rgba(15,23,42,0.72)" }}>{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center pb-4">
          <p className="text-[11px]" style={{ color: "rgba(15,23,42,0.36)" }}>{tr.footerNote}</p>
        </footer>

      </div>
    </div>
  );
}
