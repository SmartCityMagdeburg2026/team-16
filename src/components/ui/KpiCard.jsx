"use client";

import { ArrowUp, ArrowDown } from "@phosphor-icons/react";
import SparkLine from "@/components/charts/SparkLine";
import GlassCard from "./GlassCard";

export default function KpiCard({ label, value, unit, change, changeType, color, sparkData }) {
  const isUp = changeType === "up";
  const absChange = Math.abs(change);

  return (
    <GlassCard className="p-5 flex flex-col gap-4 transition-all duration-200 group cursor-default"
      style={{
        border: "1px solid rgba(148,163,184,0.22)",
        background: "rgba(255,255,255,0.85)",
      }}
    >
      <div className="flex items-start justify-between">
        <p className="text-[13px] font-medium" style={{ color: "rgba(15,23,42,0.54)" }}>
          {label}
        </p>
        <span
          className="flex items-center gap-0.5 text-[11px] font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: isUp ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
            color: isUp ? "#10B981" : "#EF4444",
          }}
        >
          {isUp
            ? <ArrowUp size={10} weight="bold" />
            : <ArrowDown size={10} weight="bold" />
          }
          {absChange}%
        </span>
      </div>

      <div>
        <p className="text-3xl font-bold tracking-tight leading-none" style={{ color: "#0F172A" }}>
          {value}
        </p>
        {unit && (
          <p className="text-[12px] mt-1" style={{ color: "rgba(15,23,42,0.42)" }}>{unit}</p>
        )}
      </div>

      {sparkData && (
        <SparkLine data={sparkData} color={color} />
      )}
    </GlassCard>
  );
}

