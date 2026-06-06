"use client";

import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import GlassCard from "@/components/ui/GlassCard";
import PageHeader from "@/components/ui/PageHeader";
import {
  Database, Globe, ShieldCheck, Lightning, GitBranch, Heart,
} from "@phosphor-icons/react";

const METHOD_ICONS = [Database, ShieldCheck, Globe, GitBranch];

const freqColors = {
  Annual:      { bg: "rgba(15,23,42,0.05)",    text: "rgba(15,23,42,0.48)", border: "rgba(15,23,42,0.14)"    },
  Quarterly:   { bg: "rgba(37,99,235,0.10)",   text: "#2563EB",             border: "rgba(37,99,235,0.22)"   },
  Monthly:     { bg: "rgba(16,185,129,0.10)",  text: "#10B981",             border: "rgba(16,185,129,0.22)"  },
  Jährlich:    { bg: "rgba(15,23,42,0.05)",    text: "rgba(15,23,42,0.48)", border: "rgba(15,23,42,0.14)"    },
  "Vierteljährl.": { bg: "rgba(37,99,235,0.10)", text: "#2563EB",           border: "rgba(37,99,235,0.22)"   },
  Monatlich:   { bg: "rgba(16,185,129,0.10)",  text: "#10B981",             border: "rgba(16,185,129,0.22)"  },
};

export default function AboutPage() {
  const { lang } = useLang();
  const tr = translations[lang].about;

  return (
    <div className="page-fade-in p-6 lg:p-8 space-y-10 max-w-5xl mx-auto">

      <PageHeader title="CityPulse" subtitle={tr.subtitle} />

      {/* Mission hero */}
      <GlassCard
        className="p-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(239,246,255,0.95) 0%, rgba(224,242,254,0.90) 100%)",
          border: "1px solid rgba(37,99,235,0.28)",
        }}
      >
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(37,99,235,0.18)" }} />
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)" }}>
              <Lightning size={15} weight="fill" className="text-white" />
            </div>
            <p className="text-[13px] font-semibold" style={{ color: "#2563EB" }}>{tr.missionLabel}</p>
          </div>
          <p className="text-[16px] leading-relaxed max-w-2xl" style={{ color: "rgba(15,23,42,0.78)" }}>
            {tr.missionBody}
          </p>
        </div>
      </GlassCard>

      {/* Methodology */}
      <section>
        <h2 className="text-[13px] font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(15,23,42,0.42)" }}>
          {tr.methodTitle}
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {tr.methods.map(({ title, body }, i) => {
            const Icon = METHOD_ICONS[i];
            return (
              <GlassCard key={title} className="p-5 flex gap-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(37,99,235,0.10)", border: "1px solid rgba(37,99,235,0.22)" }}>
                  <Icon size={17} style={{ color: "#2563EB" }} />
                </div>
                <div>
                  <p className="text-[14px] font-semibold mb-1.5" style={{ color: "#0F172A" }}>{title}</p>
                  <p className="text-[12.5px] leading-relaxed" style={{ color: "rgba(15,23,42,0.54)" }}>{body}</p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Data sources */}
      <section>
        <h2 className="text-[13px] font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(15,23,42,0.42)" }}>
          {tr.sourcesTitle}
        </h2>
        <GlassCard>
          <ul className="divide-y" style={{ borderColor: "rgba(148,163,184,0.16)" }}>
            {tr.sources.map((src) => {
              const scheme = freqColors[src.freq] || freqColors.Annual;
              return (
                <li key={src.name} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div>
                    <p className="text-[13.5px] font-medium" style={{ color: "rgba(15,23,42,0.78)" }}>{src.name}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: "rgba(15,23,42,0.42)" }}>{src.type}</p>
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full shrink-0"
                    style={{ background: scheme.bg, color: scheme.text, border: `1px solid ${scheme.border}` }}>
                    {src.freq}
                  </span>
                </li>
              );
            })}
          </ul>
        </GlassCard>
      </section>

      {/* License */}
      <GlassCard className="p-6">
        <div className="flex items-start gap-4">
          <Heart size={18} className="shrink-0 mt-0.5" style={{ color: "#EF4444" }} />
          <div>
            <p className="text-[14px] font-semibold mb-2" style={{ color: "#0F172A" }}>{tr.licenseTitle}</p>
            <p className="text-[13px] leading-relaxed" style={{ color: "rgba(15,23,42,0.56)" }}>
              {tr.licenseBody}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-[11px] px-3 py-1.5 rounded-full font-medium"
                style={{ background: "rgba(15,23,42,0.05)", color: "rgba(15,23,42,0.48)", border: "1px solid rgba(15,23,42,0.08)" }}>
                v2.4.0
              </span>
              <span className="text-[11px] px-3 py-1.5 rounded-full font-medium"
                style={{ background: "rgba(16,185,129,0.10)", color: "#10B981", border: "1px solid rgba(16,185,129,0.22)" }}>
                CC BY 4.0
              </span>
              <span className="text-[11px] px-3 py-1.5 rounded-full font-medium"
                style={{ background: "rgba(15,23,42,0.05)", color: "rgba(15,23,42,0.48)", border: "1px solid rgba(15,23,42,0.08)" }}>
                December 2024
              </span>
            </div>
          </div>
        </div>
      </GlassCard>

    </div>
  );
}
