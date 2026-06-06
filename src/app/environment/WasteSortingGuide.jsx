"use client";

import { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { wasteSortingBins } from "@/lib/mockData";
import { Check, X, Recycle, Info } from "@phosphor-icons/react";

const BIN_STYLES = {
  Brown:  { fill: "#92400e", bg: "rgba(146,64,14,0.12)",  border: "rgba(146,64,14,0.30)"  },
  Blue:   { fill: "#2563eb", bg: "rgba(37,99,235,0.12)",  border: "rgba(37,99,235,0.30)"  },
  Yellow: { fill: "#ca8a04", bg: "rgba(202,138,4,0.14)",  border: "rgba(202,138,4,0.32)"  },
  Green:  { fill: "#16a34a", bg: "rgba(22,163,74,0.12)",  border: "rgba(22,163,74,0.30)"  },
  Black:  { fill: "#374151", bg: "rgba(55,65,81,0.12)",  border: "rgba(55,65,81,0.28)"  },
  Red:    { fill: "#dc2626", bg: "rgba(220,38,38,0.12)",  border: "rgba(220,38,38,0.30)"  },
};

function TagList({ items, variant }) {
  const isAvoid = variant === "avoid";
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-medium"
          style={{
            background: isAvoid ? "rgba(220,38,38,0.08)" : "rgba(16,185,129,0.10)",
            border: isAvoid ? "1px solid rgba(220,38,38,0.18)" : "1px solid rgba(16,185,129,0.20)",
            color: isAvoid ? "#B91C1C" : "#059669",
          }}
        >
          {isAvoid ? <X size={11} weight="bold" /> : <Check size={11} weight="bold" />}
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function WasteSortingGuide() {
  const [active, setActive] = useState(0);
  const bin = wasteSortingBins[active];
  const style = BIN_STYLES[bin.binColor];

  return (
    <section className="space-y-4">
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.22)" }}
        >
          <Recycle size={18} weight="fill" style={{ color: "#10B981" }} />
        </div>
        <div>
          <h2 className="text-[15px] font-semibold" style={{ color: "#0F172A" }}>
            Waste Sorting Guide
          </h2>
          <p className="text-[12.5px] mt-1 leading-relaxed max-w-2xl" style={{ color: "rgba(15,23,42,0.56)" }}>
            Which bin does it go in? Tap a colour below to see what belongs â€” and what does not â€” for Magdeburg residents.
          </p>
        </div>
      </div>

      <GlassCard className="p-5 lg:p-6" glow="green">
        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {wasteSortingBins.map((b, i) => {
              const s = BIN_STYLES[b.binColor];
              const selected = i === active;
              return (
                <button
                  key={b.binName}
                  type="button"
                  onClick={() => setActive(i)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left shrink-0 transition-all duration-150 min-w-[200px] lg:min-w-0"
                  style={{
                    background: selected ? s.bg : "rgba(15,23,42,0.03)",
                    border: selected ? `1.5px solid ${s.border}` : "1.5px solid rgba(148,163,184,0.16)",
                    boxShadow: selected ? `0 0 0 1px ${s.fill}18` : "none",
                  }}
                >
                  <div
                    className="w-3 h-8 rounded-sm shrink-0"
                    style={{ background: s.fill, boxShadow: `inset 0 -2px 0 rgba(0,0,0,0.15)` }}
                  />
                  <span className="text-lg leading-none">{b.icon}</span>
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold truncate" style={{ color: "#0F172A" }}>{b.binName}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: "rgba(15,23,42,0.44)" }}>{b.binColor} bin</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div
            className="rounded-xl p-5 lg:p-6"
            style={{ background: style.bg, border: `1px solid ${style.border}` }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: "rgba(255,255,255,0.88)", border: `2px solid ${style.fill}` }}
              >
                {bin.icon}
              </div>
              <div>
                <p className="text-[16px] font-bold" style={{ color: "#0F172A" }}>{bin.binName}</p>
                <p className="text-[12px] mt-0.5 font-medium" style={{ color: style.fill }}>
                  {bin.binColor} bin Â· Magdeburg
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1.5" style={{ color: "#10B981" }}>
                  <Check size={13} weight="bold" /> What goes in
                </p>
                <TagList items={bin.examples} variant="examples" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1.5" style={{ color: "#B91C1C" }}>
                  <X size={13} weight="bold" /> Do not put in
                </p>
                <TagList items={bin.avoid} variant="avoid" />
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-5 flex items-start gap-2.5 px-4 py-3 rounded-xl"
          style={{ background: "rgba(15,23,42,0.04)", border: "1px solid rgba(148,163,184,0.16)" }}
        >
          <Info size={16} className="shrink-0 mt-0.5" style={{ color: "rgba(15,23,42,0.48)" }} />
          <p className="text-[11.5px] leading-relaxed" style={{ color: "rgba(15,23,42,0.56)" }}>
            Hazardous items like batteries and paint must be taken to a collection point â€” never placed in household bins.
            When unsure, check with{" "}
            <span className="font-semibold" style={{ color: "#10B981" }}>Magdeburg Abfallwirtschaft</span>.
          </p>
        </div>
      </GlassCard>
    </section>
  );
}

