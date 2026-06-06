"use client";

import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import GlassCard from "@/components/ui/GlassCard";
import PageHeader from "@/components/ui/PageHeader";
import { energyMix } from "@/lib/mockData";
import EnvironmentCharts from "./EnvironmentCharts";
import WasteSortingGuide from "./WasteSortingGuide";
import { Leaf, Drop, Sun, Wind, TrendDown, CheckCircle, Info } from "@phosphor-icons/react";

const INSIGHT_STYLES = [
  { icon: TrendDown, accent: "#10B981", bg: "rgba(16,185,129,0.07)",  border: "rgba(16,185,129,0.20)"  },
  { icon: Sun,       accent: "#F59E0B", bg: "rgba(245,158,11,0.07)",  border: "rgba(245,158,11,0.20)"  },
  { icon: Leaf,      accent: "#10B981", bg: "rgba(16,185,129,0.07)",  border: "rgba(16,185,129,0.20)"  },
];

const ENV_FACT_ICONS = [Leaf, Sun, Wind, Drop];

export default function EnvironmentPage() {
  const { lang } = useLang();
  const tr = translations[lang].environment;

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
          <div className="space-y-3">
            {tr.envFacts.map((f, i) => {
              const Icon = ENV_FACT_ICONS[i];
              return (
                <div key={f.label} className="flex items-center gap-3 rounded-xl p-3.5"
                  style={{ background: `${f.color}12`, border: `1px solid ${f.color}28` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(255,255,255,0.85)", border: `1px solid ${f.color}30` }}>
                    <Icon size={15} weight="fill" style={{ color: f.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px]" style={{ color: "rgba(15,23,42,0.54)" }}>{f.label}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: "rgba(15,23,42,0.40)" }}>{f.note}</p>
                  </div>
                  <p className="text-[14px] font-bold shrink-0" style={{ color: f.color }}>{f.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </GlassCard>

      {/* Charts */}
      <EnvironmentCharts />

      <WasteSortingGuide />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Insight cards */}
        <GlassCard className="p-6 flex flex-col gap-4">
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
        </GlassCard>

        <div className="space-y-6">
          {/* Energy breakdown */}
          <GlassCard className="p-6">
            <p className="text-[13px] font-semibold mb-1" style={{ color: "rgba(15,23,42,0.65)" }}>{tr.energyTitle}</p>
            <p className="text-[11px] mb-5" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.energySub}</p>
            <div className="space-y-3">
              {energyMix.map((e) => (
                <div key={e.name} className="flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: e.color }} />
                  <p className="text-[12.5px] flex-1" style={{ color: "rgba(15,23,42,0.62)" }}>{e.name}</p>
                  <div className="w-36 rounded-full overflow-hidden" style={{ background: "rgba(148,163,184,0.12)", height: 6 }}>
                    <div className="h-full rounded-full" style={{ width: `${e.value * 3}%`, background: e.color }} />
                  </div>
                  <p className="text-[12px] font-semibold w-8 text-right" style={{ color: "rgba(15,23,42,0.74)" }}>{e.value}%</p>
                </div>
              ))}
            </div>
            <div className="mt-5 p-3.5 rounded-xl" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.18)" }}>
              <p className="text-[12px] font-semibold mb-1" style={{ color: "#059669" }}>{tr.renewLabel}</p>
              <p className="text-[11.5px] leading-snug" style={{ color: "rgba(15,23,42,0.60)" }}>{tr.renewBody}</p>
            </div>
          </GlassCard>

          {/* AQI + Green Areas */}
          <GlassCard className="p-6">
            <p className="text-[13px] font-semibold mb-1" style={{ color: "rgba(15,23,42,0.65)" }}>{tr.aqTitle}</p>
            <p className="text-[11px] mb-4" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.aqSub}</p>
            <div className="space-y-2.5 mb-5">
              {tr.aqiScale.map((a) => (
                <div key={a.label} className="flex items-center gap-4 rounded-lg px-3 py-2.5"
                  style={{ background: a.color + "10", border: `1px solid ${a.color}25` }}>
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: a.color }} />
                  <p className="text-[13px] flex-1 font-medium" style={{ color: "rgba(15,23,42,0.74)" }}>{a.label}</p>
                  <p className="text-[11px] font-mono" style={{ color: "rgba(15,23,42,0.44)" }}>{a.range}</p>
                  {a.note && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: a.color + "20", color: a.color }}>{a.note}</span>}
                </div>
              ))}
            </div>
            <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(15,23,42,0.36)" }}>{tr.greenAreasLabel}</p>
            <div className="space-y-2">
              {tr.greenAreas.map(g => (
                <div key={g.name} className="flex items-center gap-3">
                  <Leaf size={11} weight="fill" style={{ color: "#10B981", flexShrink: 0 }} />
                  <p className="text-[12px] flex-1" style={{ color: "rgba(15,23,42,0.70)" }}>
                    {g.name}
                    <span className="ml-1 text-[10px]" style={{ color: "rgba(15,23,42,0.40)" }}>— {g.note}</span>
                  </p>
                  <span className="text-[11px] font-semibold" style={{ color: "#10B981" }}>{g.size}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

    </div>
  );
}
