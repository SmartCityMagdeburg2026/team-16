"use client";

import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import GlassCard from "@/components/ui/GlassCard";
import PageHeader from "@/components/ui/PageHeader";
import { populationHistory, ageGroups } from "@/lib/mockData";
import PeopleCharts from "./PeopleCharts";
import {
  Users, ArrowUp, ArrowDown, TrendUp, WarningCircle, Info,
} from "@phosphor-icons/react";

const INSIGHT_STYLES = [
  { icon: TrendUp,       accent: "#10B981", bg: "rgba(16,185,129,0.07)",  border: "rgba(16,185,129,0.20)"  },
  { icon: Users,         accent: "#06B6D4", bg: "rgba(6,182,212,0.07)",   border: "rgba(6,182,212,0.20)"   },
  { icon: WarningCircle, accent: "#EF4444", bg: "rgba(239,68,68,0.07)",   border: "rgba(239,68,68,0.20)"   },
];

export default function PeoplePage() {
  const { lang } = useLang();
  const tr = translations[lang].people;

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

      {/* Overview banner */}
      <GlassCard className="p-6">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.overviewLabel}</p>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#0F172A" }}>{tr.overviewTitle}</h2>
            <p className="text-[13.5px] leading-relaxed" style={{ color: "rgba(15,23,42,0.68)" }}>{tr.overviewP1}</p>
            <p className="text-[13.5px] leading-relaxed mt-3" style={{ color: "rgba(15,23,42,0.68)" }}>{tr.overviewP2}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {tr.miniStats.map(f => (
              <div key={f.label} className="rounded-xl p-3.5" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.18)" }}>
                <p className="text-[16px] font-bold" style={{ color: "#10B981" }}>{f.value}</p>
                <p className="text-[11px] font-semibold mt-0.5" style={{ color: "#10B981" }}>{f.label}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(15,23,42,0.44)" }}>{f.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Charts */}
      <PeopleCharts />

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

      {/* Age distribution + Migration */}
      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[13px] font-semibold" style={{ color: "rgba(15,23,42,0.65)" }}>{tr.ageTitle}</p>
              <p className="text-[11px] mt-0.5" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.ageSub}</p>
            </div>
          </div>
          <div className="space-y-3">
            {ageGroups.map((ag) => (
              <div key={ag.group} className="flex items-center gap-4">
                <p className="text-[12px] w-14 shrink-0" style={{ color: "rgba(15,23,42,0.56)" }}>{ag.group}</p>
                <div className="flex-1 rounded-full overflow-hidden" style={{ background: "rgba(148,163,184,0.12)", height: 7 }}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${ag.value * 3}%`, background: ag.color }} />
                </div>
                <p className="text-[12px] font-semibold w-10 text-right" style={{ color: ag.color }}>{ag.value}%</p>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 rounded-xl p-3" style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.18)" }}>
            <p className="text-[12px] font-semibold" style={{ color: "#EF4444" }}>{tr.demoNote}</p>
            <p className="text-[11.5px] mt-1 leading-snug" style={{ color: "rgba(15,23,42,0.60)" }}>{tr.demoNoteBody}</p>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-[13px] font-semibold mb-1" style={{ color: "rgba(15,23,42,0.65)" }}>{tr.migTitle}</p>
          <p className="text-[11px] mb-5" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.migSub}</p>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {tr.migFacts.map(f => (
              <div key={f.label} className="rounded-xl p-3.5" style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(148,163,184,0.18)" }}>
                <p className="text-[17px] font-bold" style={{ color: "#0F172A" }}>{f.value}</p>
                <p className="text-[11px] font-medium mt-0.5" style={{ color: "rgba(15,23,42,0.54)" }}>{f.label}</p>
                <div className="flex items-center gap-1 mt-1">
                  {f.up
                    ? <ArrowUp size={10} weight="bold" style={{ color: "#10B981" }} />
                    : <ArrowDown size={10} weight="bold" style={{ color: "#EF4444" }} />}
                  <span className="text-[10px] font-semibold" style={{ color: f.up ? "#10B981" : "#EF4444" }}>{f.delta} YoY</span>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-3.5" style={{ background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.18)" }}>
            <div className="flex items-start gap-2">
              <Info size={14} style={{ color: "#06B6D4", marginTop: 2, flexShrink: 0 }} />
              <p className="text-[12px] leading-relaxed" style={{ color: "rgba(15,23,42,0.65)" }}>{tr.migInfo}</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* District Snapshot */}
      <GlassCard className="p-6">
        <p className="text-[11px] font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.districtTitle}</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {tr.districts.map(d => (
            <div key={d.name} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(148,163,184,0.18)" }}>
              <div className="flex items-baseline justify-between mb-1.5">
                <p className="text-[13px] font-bold" style={{ color: "#0F172A" }}>{d.name}</p>
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                  style={{
                    background: d.density === "High" || d.density === "Hoch" ? "rgba(16,185,129,0.12)" : d.density === "Medium" || d.density === "Mittel" ? "rgba(37,99,235,0.12)" : "rgba(16,185,129,0.12)",
                    color: d.density === "High" || d.density === "Hoch" ? "#10B981" : d.density === "Medium" || d.density === "Mittel" ? "#2563EB" : "#059669",
                  }}>
                  {d.density}
                </span>
              </div>
              <p className="text-[14px] font-semibold mb-1" style={{ color: "#10B981" }}>{d.pop}</p>
              <p className="text-[11.5px] leading-snug" style={{ color: "rgba(15,23,42,0.56)" }}>{d.note}</p>
            </div>
          ))}
        </div>
      </GlassCard>

    </div>
  );
}
