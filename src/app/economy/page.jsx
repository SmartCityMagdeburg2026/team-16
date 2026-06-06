"use client";

import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import GlassCard from "@/components/ui/GlassCard";
import PageHeader from "@/components/ui/PageHeader";
import EconomyCharts from "./EconomyCharts";
import { TrendUp, Factory, Buildings, Info } from "@phosphor-icons/react";

const INSIGHT_STYLES = [
  { icon: TrendUp,   accent: "#F59E0B", bg: "rgba(245,158,11,0.07)",  border: "rgba(245,158,11,0.20)"  },
  { icon: Factory,   accent: "#EF4444", bg: "rgba(239,68,68,0.07)",   border: "rgba(239,68,68,0.20)"   },
  { icon: Buildings, accent: "#2563EB", bg: "rgba(37,99,235,0.07)",   border: "rgba(37,99,235,0.20)"   },
];

export default function EconomyPage() {
  const { lang } = useLang();
  const tr = translations[lang].economy;

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
              <div key={f.label} className="rounded-xl p-3.5" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.18)" }}>
                <p className="text-[16px] font-bold" style={{ color: "#F59E0B" }}>{f.value}</p>
                <p className="text-[11px] font-semibold mt-0.5" style={{ color: "#F59E0B" }}>{f.label}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(15,23,42,0.44)" }}>{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Charts */}
      <EconomyCharts />

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

      {/* Sectors + Major employers */}
      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <p className="text-[13px] font-semibold mb-1" style={{ color: "rgba(15,23,42,0.65)" }}>{tr.sectorTitle}</p>
          <p className="text-[11px] mb-5" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.sectorSub}</p>
          <div className="space-y-3">
            {tr.sectors.map((s) => (
              <div key={s.name}>
                <div className="flex items-center gap-4 mb-0.5">
                  <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: s.color }} />
                  <p className="text-[12.5px] flex-1 font-medium" style={{ color: "rgba(15,23,42,0.70)" }}>{s.name}</p>
                  <div className="w-40 rounded-full overflow-hidden" style={{ background: "rgba(148,163,184,0.12)", height: 6 }}>
                    <div className="h-full rounded-full" style={{ width: `${s.share * 2}%`, background: s.color }} />
                  </div>
                  <p className="text-[12px] font-semibold w-8 text-right" style={{ color: "rgba(15,23,42,0.74)" }}>{s.share}%</p>
                </div>
                <p className="text-[11px] pl-6" style={{ color: "rgba(15,23,42,0.40)" }}>{s.note}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-[13px] font-semibold mb-1" style={{ color: "rgba(15,23,42,0.65)" }}>{tr.employersTitle}</p>
          <p className="text-[11px] mb-5" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.employersSub}</p>
          <div className="space-y-2.5">
            {tr.employers.map((e, i) => (
              <div key={e.name} className="flex items-start gap-3 rounded-xl px-3.5 py-3"
                style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(148,163,184,0.18)" }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold"
                  style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B" }}>{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] font-semibold" style={{ color: "#0F172A" }}>{e.name}</p>
                  <p className="text-[11px]" style={{ color: "rgba(15,23,42,0.48)" }}>{e.sector} · {e.note}</p>
                </div>
                <p className="text-[12px] font-bold shrink-0" style={{ color: "#F59E0B" }}>{e.employees}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2 p-3 rounded-xl" style={{ background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.18)" }}>
            <Info size={13} style={{ color: "#2563EB", marginTop: 2, flexShrink: 0 }} />
            <p className="text-[11.5px] leading-snug" style={{ color: "rgba(15,23,42,0.62)" }}>{tr.intelNote}</p>
          </div>
        </GlassCard>
      </div>

    </div>
  );
}
