"use client";

import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import GlassCard from "@/components/ui/GlassCard";
import BarWidget from "@/components/charts/BarWidget";
import AreaWidget from "@/components/charts/AreaWidget";
import DonutWidget from "@/components/charts/DonutWidget";
import { realRentPerSqm } from "@/lib/realData";
import { housingByType, constructionActivity } from "@/lib/mockData";

const T = ({ children }) => <p className="text-[13px] font-semibold mb-1" style={{ color: "rgba(15,23,42,0.65)" }}>{children}</p>;
const S = ({ children }) => <p className="text-[11px] mb-5" style={{ color: "rgba(15,23,42,0.40)" }}>{children}</p>;

export default function HousingCharts() {
  const { lang } = useLang();
  const tr = translations[lang].charts.housing;

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <T>{tr.mixTitle}</T>
          <p className="text-[11px] mb-2" style={{ color: "rgba(15,23,42,0.40)" }}>{tr.mixSub}</p>
          <DonutWidget data={housingByType} height={300} innerRadius={60} outerRadius={95} />
        </GlassCard>

        <GlassCard className="p-6 lg:col-span-2">
          <T>{tr.rentTitle}</T>
          <S>{tr.rentSub}</S>
          <AreaWidget
            data={realRentPerSqm}
            dataKey="avgPerSqm"
            xKey="year"
            color="#2563EB"
            height={200}
            formatter={(v) => `€${v.toFixed(2)}/m²`}
            gradientId="rentGrad"
          />
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <T>{tr.conTitle}</T>
        <S>{tr.conSub}</S>
        <BarWidget
          data={constructionActivity}
          bars={[
            { dataKey: "permits",     color: "#F59E0B", name: tr.permits     },
            { dataKey: "completions", color: "#EF4444", name: tr.completions },
          ]}
          xKey="year"
          height={220}
        />
      </GlassCard>
    </div>
  );
}
