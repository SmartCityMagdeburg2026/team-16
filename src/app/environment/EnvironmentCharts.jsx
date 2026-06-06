"use client";

import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import GlassCard from "@/components/ui/GlassCard";
import AreaWidget from "@/components/charts/AreaWidget";
import BarWidget from "@/components/charts/BarWidget";
import DonutWidget from "@/components/charts/DonutWidget";
import TreemapWidget from "@/components/charts/TreemapWidget";
import { formatNumber } from "@/lib/utils";
import { realPM10 } from "@/lib/realData";
import { co2Emissions, energyMix, wasteByType } from "@/lib/mockData";

const fmtMt = (v) => (v / 1e6).toFixed(2) + "Mt";
const WASTE_TOTAL = wasteByType.reduce((sum, w) => sum + w.tons, 0);
const T = ({ children }) => <p className="text-[13px] font-semibold mb-1" style={{ color: "rgba(15,23,42,0.65)" }}>{children}</p>;
const S = ({ children }) => <p className="text-[11px] mb-5" style={{ color: "rgba(15,23,42,0.40)" }}>{children}</p>;

export default function EnvironmentCharts() {
  const { lang } = useLang();
  const tr = translations[lang].charts.environment;

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard className="p-6 lg:col-span-2">
          <T>{tr.co2Title}</T>
          <S>{tr.co2Sub}</S>
          <AreaWidget
            data={co2Emissions}
            dataKey="tons"
            xKey="year"
            color="#10B981"
            height={200}
            formatter={fmtMt}
            gradientId="co2Grad"
          />
        </GlassCard>

        <GlassCard className="p-6">
          <T>{tr.mixTitle}</T>
          <p className="text-[11px] mb-2" style={{ color: "rgba(15,23,42,0.40)" }}>By source - 2024</p>
          <DonutWidget data={energyMix} height={230} innerRadius={60} outerRadius={95} />
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <T>{tr.pm10Title}</T>
        <S>{tr.pm10Sub}</S>
        <BarWidget
          data={realPM10}
          bars={[
            { dataKey: "max", color: "#EF4444", name: tr.stationMax },
            { dataKey: "avg", color: "#10B981", name: tr.stationAvg },
            { dataKey: "min", color: "#06B6D4", name: tr.stationMin },
          ]}
          xKey="year"
          height={200}
          unit=" ug/m3"
        />
      </GlassCard>

      <GlassCard className="p-6">
        <T>{tr.wasteTitle}</T>
        <S>
          {tr.wasteSub} — {formatNumber(WASTE_TOTAL)} t total
        </S>
        <TreemapWidget data={wasteByType} height={300} />
      </GlassCard>
    </div>
  );
}
