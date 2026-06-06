"use client";

import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import GlassCard from "@/components/ui/GlassCard";
import PageHeader from "@/components/ui/PageHeader";
import { housingByType, constructionActivity } from "@/lib/mockData";
import HousingCharts from "./HousingCharts";
import { Buildings, TrendUp, Info, CheckCircle, WarningCircle } from "@phosphor-icons/react";

const INSIGHT_STYLES = [
  { icon: CheckCircle,   accent: "#10B981", bg: "rgba(16,185,129,0.07)",  border: "rgba(16,185,129,0.20)"  },
  { icon: TrendUp,       accent: "#F59E0B", bg: "rgba(245,158,11,0.07)",  border: "rgba(245,158,11,0.20)"  },
  { icon: WarningCircle, accent: "#EF4444", bg: "rgba(239,68,68,0.07)",   border: "rgba(239,68,68,0.20)"   },
];

export default function HousingPage() {
  const { lang } = useLang();
  const tr = translations[lang].housing;

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
            {tr.refFacts.map(f => (
              <div key={f.label} className="flex items-center gap-4 rounded-xl p-3.5"
                style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.18)" }}>
                <div className="flex-1">
                  <p className="text-[11.5px]" style={{ color: "rgba(15,23,42,0.56)" }}>{f.label}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "rgba(15,23,42,0.40)" }}>{f.note}</p>
                </div>
                <p className="text-[15px] font-bold shrink-0" style={{ color: "#F59E0B" }}>{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Charts */}
      <HousingCharts />

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

      {/* Housing breakdown + Pipeline */}
      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <p className="text-[13px] font-semibold mb-1" style={{ color: "rgba(15,23,42,0.65)" }}>{tr.stockTitle}</p>
          <p className="text-[11px] mb-5" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.stockSub}</p>
          <div className="space-y-3">
            {housingByType.map((h) => (
              <div key={h.name} className="flex items-center gap-4">
                <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: h.color }} />
                <p className="text-[12.5px] flex-1" style={{ color: "rgba(15,23,42,0.62)" }}>{h.name}</p>
                <div className="w-40 rounded-full overflow-hidden" style={{ background: "rgba(148,163,184,0.12)", height: 6 }}>
                  <div className="h-full rounded-full" style={{ width: `${h.value}%`, background: h.color }} />
                </div>
                <p className="text-[12px] font-semibold w-10 text-right" style={{ color: "rgba(15,23,42,0.74)" }}>{h.value}%</p>
              </div>
            ))}
          </div>
          <div className="mt-5 p-3.5 rounded-xl" style={{ background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.18)" }}>
            <p className="text-[12px] font-semibold mb-1" style={{ color: "#2563EB" }}>{tr.whyApts}</p>
            <p className="text-[11.5px] leading-snug" style={{ color: "rgba(15,23,42,0.60)" }}>{tr.whyAptsBody}</p>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-[13px] font-semibold mb-1" style={{ color: "rgba(15,23,42,0.65)" }}>{tr.pipelineTitle}</p>
          <p className="text-[11px] mb-5" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.pipelineSub}</p>
          <div className="space-y-4">
            {[
              { year: "2024", permits: 5050, completions: 4200, note: tr.pipelineRows[0].note },
              { year: "2023", permits: 4100, completions: 3700, note: tr.pipelineRows[1].note },
              { year: "2022", permits: 3800, completions: 3400, note: tr.pipelineRows[2].note },
            ].map(r => (
              <div key={r.year} className="rounded-xl p-3.5" style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(148,163,184,0.18)" }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[12px] font-bold" style={{ color: "#0F172A" }}>{r.year}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.12)", color: "#059669" }}>{r.note}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px]" style={{ color: "rgba(15,23,42,0.44)" }}>{tr.permitLabel}</p>
                    <p className="text-[14px] font-bold" style={{ color: "#F59E0B" }}>{r.permits.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px]" style={{ color: "rgba(15,23,42,0.44)" }}>{tr.completionLabel}</p>
                    <p className="text-[14px] font-bold" style={{ color: "#EF4444" }}>{r.completions.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl flex items-start gap-2" style={{ background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.18)" }}>
            <Info size={13} style={{ color: "#06B6D4", marginTop: 2, flexShrink: 0 }} />
            <p className="text-[11.5px] leading-snug" style={{ color: "rgba(15,23,42,0.62)" }}>{tr.pipelineInfo}</p>
          </div>
        </GlassCard>
      </div>

    </div>
  );
}
