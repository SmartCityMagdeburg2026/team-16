"use client";

import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import GlassCard from "@/components/ui/GlassCard";
import PageHeader from "@/components/ui/PageHeader";
import { modalSplit } from "@/lib/mockData";
import MobilityCharts from "./MobilityCharts";
import { Train, Bicycle, TrendUp, Leaf, Info } from "@phosphor-icons/react";

const INSIGHT_STYLES = [
  { icon: Train,   accent: "#06B6D4", bg: "rgba(6,182,212,0.07)",   border: "rgba(6,182,212,0.20)"   },
  { icon: Bicycle, accent: "#10B981", bg: "rgba(16,185,129,0.07)",  border: "rgba(16,185,129,0.20)"  },
  { icon: Leaf,    accent: "#10B981", bg: "rgba(16,185,129,0.07)",  border: "rgba(16,185,129,0.20)"  },
];

const TRAM_LINES = [
  { line: "1",  route: "Messgelände ↔ Sudenburg",        freq: "10 min", riders: "high"   },
  { line: "2",  route: "Europaplatz ↔ Alte Neustadt",    freq: "10 min", riders: "high"   },
  { line: "4",  route: "Hasselbachplatz ↔ Barleber See", freq: "15 min", riders: "medium" },
  { line: "6",  route: "Jacobstraße ↔ Neustädter See",   freq: "12 min", riders: "high"   },
  { line: "8",  route: "Cracauer Straße ↔ Barleber See", freq: "20 min", riders: "medium" },
  { line: "10", route: "Hauptbahnhof ↔ Reform",          freq: "10 min", riders: "high"   },
];

export default function MobilityPage() {
  const { lang } = useLang();
  const tr = translations[lang].mobility;

  return (
    <div className="page-fade-in p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">

      <PageHeader title={tr.title} subtitle={tr.subtitle} />

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {tr.stats.map((s) => (
          <GlassCard key={s.label} className="p-5">
            <p className="text-[12px] mb-2" style={{ color: "rgba(15,23,42,0.48)" }}>{s.label}</p>
            <p className="text-[22px] font-bold leading-none" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[11px] mt-1.5" style={{ color: "rgba(15,23,42,0.42)" }}>{s.sub}</p>
          </GlassCard>
        ))}
      </div>

      {/* Overview */}
      <GlassCard className="p-6">
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <div>
            <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(15,23,42,0.40)" }}>{translations[lang].ui.overview}</p>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#0F172A" }}>{tr.overviewTitle}</h2>
            <p className="text-[13.5px] leading-relaxed" style={{ color: "rgba(15,23,42,0.68)" }}>{tr.overviewP1}</p>
            <p className="text-[13.5px] leading-relaxed mt-3" style={{ color: "rgba(15,23,42,0.68)" }}>{tr.overviewP2}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {tr.gridFacts.map(f => (
              <div key={f.label} className="rounded-xl p-3.5" style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.18)" }}>
                <p className="text-[16px] font-bold" style={{ color: "#06B6D4" }}>{f.value}</p>
                <p className="text-[11px] font-semibold mt-0.5" style={{ color: "#06B6D4" }}>{f.label}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(15,23,42,0.44)" }}>{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Charts */}
      <MobilityCharts />

      {/* Insight cards */}
      <div className="grid lg:grid-cols-3 gap-5">
        {tr.insights.map((ins, i) => {
          const { icon: Icon, accent, bg, border } = INSIGHT_STYLES[i];
          return (
            <div key={ins.title} className="rounded-2xl p-5" style={{ background: bg, border: `1px solid ${border}` }}>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,255,255,0.85)", border: `1px solid ${border}` }}>
                  <Icon size={15} weight="fill" style={{ color: accent }} />
                </div>
                <p className="text-[13px] font-bold" style={{ color: "#0F172A" }}>{ins.title}</p>
              </div>
              <p className="text-[12.5px] leading-relaxed" style={{ color: "rgba(15,23,42,0.68)" }}>{ins.body}</p>
            </div>
          );
        })}
      </div>

      {/* Modal split + Tram lines */}
      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <p className="text-[13px] font-semibold mb-1" style={{ color: "rgba(15,23,42,0.65)" }}>{tr.modalTitle}</p>
          <p className="text-[11px] mb-5" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.modalSub}</p>
          <div className="space-y-3">
            {modalSplit.map((m) => (
              <div key={m.name} className="flex items-center gap-4">
                <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: m.color }} />
                <p className="text-[12.5px] flex-1" style={{ color: "rgba(15,23,42,0.62)" }}>{m.name}</p>
                <div className="w-48 rounded-full overflow-hidden" style={{ background: "rgba(148,163,184,0.12)", height: 6 }}>
                  <div className="h-full rounded-full" style={{ width: `${m.value * 2.5}%`, background: m.color }} />
                </div>
                <p className="text-[12px] font-semibold w-10 text-right" style={{ color: "rgba(15,23,42,0.74)" }}>{m.value}%</p>
              </div>
            ))}
          </div>
          <div className="mt-5 p-3.5 rounded-xl" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.18)" }}>
            <p className="text-[12px] font-semibold mb-1" style={{ color: "#10B981" }}>{tr.target2030Label}</p>
            <p className="text-[11.5px] leading-snug" style={{ color: "rgba(15,23,42,0.60)" }}>{tr.target2030Body}</p>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-[13px] font-semibold mb-1" style={{ color: "rgba(15,23,42,0.65)" }}>{tr.tramTitle}</p>
          <p className="text-[11px] mb-5" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.tramSub}</p>
          <div className="space-y-2.5">
            {TRAM_LINES.map((t) => (
              <div key={t.line} className="flex items-center gap-3 rounded-xl px-3.5 py-3"
                style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(148,163,184,0.18)" }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold text-white"
                  style={{ background: "#06B6D4" }}>
                  {t.line}
                </div>
                <p className="text-[12px] flex-1" style={{ color: "rgba(15,23,42,0.70)" }}>{t.route}</p>
                <span className="text-[10px] font-semibold shrink-0 px-2 py-0.5 rounded-full"
                  style={{
                    background: t.riders === "high" ? "rgba(6,182,212,0.12)" : "rgba(37,99,235,0.12)",
                    color: t.riders === "high" ? "#06B6D4" : "#2563EB",
                  }}>
                  {tr.every} {t.freq}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2 p-3 rounded-xl" style={{ background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.18)" }}>
            <Info size={13} style={{ color: "#06B6D4", marginTop: 2, flexShrink: 0 }} />
            <p className="text-[11.5px] leading-snug" style={{ color: "rgba(15,23,42,0.62)" }}>{tr.tramInfo}</p>
          </div>
        </GlassCard>
      </div>

    </div>
  );
}
