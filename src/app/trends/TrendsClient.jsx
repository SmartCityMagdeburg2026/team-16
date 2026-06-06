"use client";

import { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import LineWidget from "@/components/charts/LineWidget";
import BarWidget from "@/components/charts/BarWidget";
import { cityEvolution } from "@/lib/mockData";

const METRICS = [
  { key: "population",  label: "Population",       color: "#2563EB", fmt: (v) => (v/1e6).toFixed(2)+"M" },
  { key: "employment",  label: "Employment Rate",   color: "#10B981", fmt: (v) => v+"%"                  },
  { key: "co2",         label: "COâ‚‚ Emissions",    color: "#10B981", fmt: (v) => (v/1e6).toFixed(2)+"Mt"},
  { key: "transit",     label: "Transit Ridership", color: "#06B6D4", fmt: (v) => (v/1e6).toFixed(2)+"M" },
  { key: "housing",     label: "Construction",      color: "#2563EB", fmt: (v) => v                       },
  { key: "education",   label: "Education Index",   color: "#2563EB", fmt: (v) => v                       },
];

export default function TrendsClient() {
  const [activeMetrics, setActiveMetrics] = useState(["population", "employment"]);
  const [yearRange, setYearRange] = useState([2015, 2024]);
  const [compareMode, setCompareMode] = useState(false);
  const [compareYears, setCompareYears] = useState([2019, 2024]);

  const filteredData = cityEvolution.filter(
    (d) => d.year >= yearRange[0] && d.year <= yearRange[1]
  );

  const toggleMetric = (key) => {
    setActiveMetrics((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const lines = METRICS
    .filter((m) => activeMetrics.includes(m.key))
    .map((m) => ({ dataKey: m.key, color: m.color, name: m.label }));

  const yearSnap = (yr) => cityEvolution.find((d) => d.year === yr);
  const snap1 = yearSnap(compareYears[0]);
  const snap2 = yearSnap(compareYears[1]);
  const compareData = snap1 && snap2
    ? METRICS.map((m) => ({
        metric: m.label,
        [compareYears[0]]: snap1[m.key],
        [compareYears[1]]: snap2[m.key],
      }))
    : [];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <GlassCard className="p-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1">
            <p className="text-[12px] mb-3 font-medium uppercase tracking-widest" style={{ color: "rgba(15,23,42,0.44)" }}>
              Year Range
            </p>
            <div className="flex items-center gap-4">
              <span className="text-[13px] font-semibold w-10" style={{ color: "rgba(15,23,42,0.70)" }}>{yearRange[0]}</span>
              <input
                type="range" min={2015} max={2024} value={yearRange[0]}
                onChange={(e) => setYearRange([+e.target.value, yearRange[1]])}
                className="flex-1 accent-blue-600"
              />
              <input
                type="range" min={2015} max={2024} value={yearRange[1]}
                onChange={(e) => setYearRange([yearRange[0], +e.target.value])}
                className="flex-1 accent-blue-600"
              />
              <span className="text-[13px] font-semibold w-10 text-right" style={{ color: "rgba(15,23,42,0.70)" }}>{yearRange[1]}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCompareMode((v) => !v)}
              className="px-4 py-2 rounded-lg text-[12px] font-semibold transition-all duration-150"
              style={{
                background: compareMode ? "rgba(37,99,235,0.18)" : "rgba(15,23,42,0.05)",
                color: compareMode ? "#2563EB" : "rgba(15,23,42,0.54)",
                border: `1px solid ${compareMode ? "rgba(37,99,235,0.30)" : "rgba(15,23,42,0.14)"}`,
              }}
            >
              Compare Years
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Metric toggles */}
      <div className="flex flex-wrap gap-2">
        {METRICS.map((m) => {
          const active = activeMetrics.includes(m.key);
          return (
            <button
              key={m.key}
              onClick={() => toggleMetric(m.key)}
              className="px-3 py-1.5 rounded-full text-[12px] font-medium transition-all duration-150"
              style={{
                background: active ? m.color + "18" : "rgba(15,23,42,0.04)",
                color: active ? m.color : "rgba(15,23,42,0.44)",
                border: `1px solid ${active ? m.color + "40" : "rgba(15,23,42,0.08)"}`,
              }}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Evolution chart */}
      {!compareMode && (
        <GlassCard className="p-6">
          <p className="text-[13px] font-semibold mb-1" style={{ color: "rgba(15,23,42,0.65)" }}>City Evolution Timeline</p>
          <p className="text-[11px] mb-5" style={{ color: "rgba(15,23,42,0.36)" }}>
            {yearRange[0]}â€“{yearRange[1]} Â· {activeMetrics.length} metrics selected
          </p>
          {lines.length > 0 ? (
            <LineWidget data={filteredData} lines={lines} xKey="year" height={280} showLegend />
          ) : (
            <div className="h-[280px] flex items-center justify-center text-sm" style={{ color: "rgba(15,23,42,0.30)" }}>
              Select at least one metric above
            </div>
          )}
        </GlassCard>
      )}

      {/* Compare mode */}
      {compareMode && (
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[13px] font-semibold mb-1" style={{ color: "rgba(15,23,42,0.65)" }}>Year Comparison</p>
              <p className="text-[11px]" style={{ color: "rgba(15,23,42,0.36)" }}>Snapshot across all metrics</p>
            </div>
            <div className="flex items-center gap-3">
              {[0, 1].map((idx) => (
                <select
                  key={idx}
                  value={compareYears[idx]}
                  onChange={(e) => {
                    const copy = [...compareYears];
                    copy[idx] = +e.target.value;
                    setCompareYears(copy);
                  }}
                  className="px-3 py-1.5 rounded-lg text-[12px] font-medium"
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    border: "1px solid rgba(148,163,184,0.24)",
                    color: "#0F172A",
                  }}
                >
                  {cityEvolution.map((d) => (
                    <option key={d.year} value={d.year}>{d.year}</option>
                  ))}
                </select>
              ))}
            </div>
          </div>
          {compareData.length > 0 && snap1 && snap2 && (
            <div className="space-y-4">
              {METRICS.map((m) => {
                const v1 = snap1[m.key];
                const v2 = snap2[m.key];
                const delta = (((v2 - v1) / v1) * 100).toFixed(1);
                const isUp = v2 >= v1;
                return (
                  <div key={m.key} className="flex items-center gap-4">
                    <p className="text-[12.5px] w-36 shrink-0" style={{ color: "rgba(15,23,42,0.56)" }}>{m.label}</p>
                    <p className="text-[13px] font-semibold w-20" style={{ color: "rgba(15,23,42,0.65)" }}>{m.fmt(v1)}</p>
                    <div className="flex-1 text-center text-[10px]" style={{ color: "rgba(15,23,42,0.30)" }}>â†’</div>
                    <p className="text-[13px] font-semibold w-20" style={{ color: "#0F172A" }}>{m.fmt(v2)}</p>
                    <span
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-full w-16 text-center"
                      style={{
                        background: isUp ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                        color: isUp ? "#10B981" : "#EF4444",
                      }}
                    >
                      {isUp ? "+" : ""}{delta}%
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </GlassCard>
      )}
    </div>
  );
}

