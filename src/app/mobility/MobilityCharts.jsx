"use client";

import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import GlassCard from "@/components/ui/GlassCard";
import AreaWidget from "@/components/charts/AreaWidget";
import BarWidget from "@/components/charts/BarWidget";
import DonutWidget from "@/components/charts/DonutWidget";
import { realTransit } from "@/lib/realData";
import { modalSplit, congestionIndex } from "@/lib/mockData";

const fmtM = (v) => v.toFixed(1) + "M";
const T = ({ children }) => <p className="text-[13px] font-semibold mb-1" style={{ color: "rgba(15,23,42,0.65)" }}>{children}</p>;
const S = ({ children }) => <p className="text-[11px] mb-5" style={{ color: "rgba(15,23,42,0.40)" }}>{children}</p>;

export default function MobilityCharts() {
  const { lang } = useLang();
  const tr = translations[lang].charts.mobility;

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard className="p-6 lg:col-span-2">
          <T>{tr.riderTitle}</T>
          <S>{tr.riderSub}</S>
          <AreaWidget
            data={realTransit}
            dataKey="passengers"
            xKey="year"
            color="#06B6D4"
            height={200}
            formatter={fmtM}
            gradientId="riderGrad"
          />
        </GlassCard>

        <GlassCard className="p-6">
          <T>{tr.modalTitle}</T>
          <p className="text-[11px] mb-2" style={{ color: "rgba(15,23,42,0.40)" }}>How people travel</p>
          <DonutWidget data={modalSplit} height={230} innerRadius={60} outerRadius={95} />
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <T>{tr.congTitle}</T>
        <S>{tr.congSub}</S>
        <BarWidget
          data={congestionIndex}
          bars={[{ dataKey: "index", color: "#06B6D4", name: tr.congestion }]}
          xKey="hour"
          height={180}
        />
      </GlassCard>
    </div>
  );
}
