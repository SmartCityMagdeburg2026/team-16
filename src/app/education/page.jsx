"use client";

import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import GlassCard from "@/components/ui/GlassCard";
import PageHeader from "@/components/ui/PageHeader";
import { educationAttainment } from "@/lib/mockData";
import EducationCharts from "./EducationCharts";
import { GraduationCap, BookOpen, TrendUp, Laptop, Info, Flask } from "@phosphor-icons/react";

const INSIGHT_STYLES = [
  { icon: GraduationCap, accent: "#2563EB", bg: "rgba(37,99,235,0.07)",   border: "rgba(37,99,235,0.20)"   },
  { icon: TrendUp,       accent: "#06B6D4", bg: "rgba(6,182,212,0.07)",   border: "rgba(6,182,212,0.20)"   },
  { icon: Laptop,        accent: "#10B981", bg: "rgba(16,185,129,0.07)",  border: "rgba(16,185,129,0.20)"  },
];

export default function EducationPage() {
  const { lang } = useLang();
  const tr = translations[lang].education;

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
              <div key={f.label} className="rounded-xl p-3.5" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.18)" }}>
                <p className="text-[16px] font-bold" style={{ color: "#2563EB" }}>{f.value}</p>
                <p className="text-[11px] font-semibold mt-0.5" style={{ color: "#2563EB" }}>{f.label}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(15,23,42,0.44)" }}>{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Charts */}
      <EducationCharts />

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

      {/* Attainment + School system + Research */}
      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <p className="text-[13px] font-semibold mb-1" style={{ color: "rgba(15,23,42,0.65)" }}>{tr.attainTitle}</p>
          <p className="text-[11px] mb-5" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.attainSub}</p>
          <div className="space-y-3">
            {educationAttainment.map((e) => (
              <div key={e.level} className="flex items-center gap-4">
                <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: e.color }} />
                <p className="text-[12.5px] flex-1" style={{ color: "rgba(15,23,42,0.62)" }}>{e.level}</p>
                <div className="w-44 rounded-full overflow-hidden" style={{ background: "rgba(148,163,184,0.12)", height: 6 }}>
                  <div className="h-full rounded-full" style={{ width: `${(e.value / 35) * 100}%`, background: e.color }} />
                </div>
                <p className="text-[12px] font-semibold w-10 text-right" style={{ color: "rgba(15,23,42,0.74)" }}>{e.value}%</p>
              </div>
            ))}
          </div>
          <div className="mt-5 p-3.5 rounded-xl" style={{ background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.18)" }}>
            <p className="text-[12px] font-semibold mb-1" style={{ color: "#2563EB" }}>{tr.tertiaryLabel}</p>
            <p className="text-[11.5px] leading-snug" style={{ color: "rgba(15,23,42,0.60)" }}>{tr.tertiaryBody}</p>
          </div>
        </GlassCard>

        <div className="space-y-5">
          <GlassCard className="p-6">
            <p className="text-[13px] font-semibold mb-1" style={{ color: "rgba(15,23,42,0.65)" }}>{tr.schoolTitle}</p>
            <p className="text-[11px] mb-4" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.schoolSub}</p>
            <div className="space-y-2">
              {tr.schools.map((s) => (
                <div key={s.type} className="flex items-center gap-3 rounded-xl px-3.5 py-2.5"
                  style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(148,163,184,0.18)" }}>
                  <BookOpen size={13} style={{ color: "#2563EB", flexShrink: 0 }} />
                  <p className="text-[12px] flex-1" style={{ color: "rgba(15,23,42,0.70)" }}>
                    {s.type}
                    <span className="ml-1 text-[10px]" style={{ color: "rgba(15,23,42,0.40)" }}>— {s.note}</span>
                  </p>
                  <span className="text-[11px] font-semibold" style={{ color: "#06B6D4" }}>
                    {s.count} {translations[lang].ui.institutions}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <p className="text-[13px] font-semibold mb-1" style={{ color: "rgba(15,23,42,0.65)" }}>{tr.researchTitle}</p>
            <p className="text-[11px] mb-4" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.researchSub}</p>
            <div className="space-y-2.5">
              {tr.research.map((r) => (
                <div key={r.org} className="rounded-xl p-3"
                  style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.14)" }}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <Flask size={11} weight="fill" style={{ color: "#2563EB" }} />
                    <p className="text-[12px] font-semibold" style={{ color: "#0F172A" }}>{r.org}</p>
                    <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ background: "rgba(37,99,235,0.12)", color: "#2563EB" }}>{r.rank}</span>
                  </div>
                  <p className="text-[11px] pl-5" style={{ color: "rgba(15,23,42,0.54)" }}>{r.field}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

    </div>
  );
}
