"use client";

import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import GlassCard from "@/components/ui/GlassCard";
import AreaWidget from "@/components/charts/AreaWidget";
import BarWidget from "@/components/charts/BarWidget";
import LineWidget from "@/components/charts/LineWidget";
import { realPopulation, realBirthsDeaths } from "@/lib/realData";

const fmt  = (v) => (v / 1e6).toFixed(3) + "M";
const fmtK = (v) => (v / 1000).toFixed(0) + "k";

const T = ({ children }) => <p className="text-[13px] font-semibold mb-1" style={{ color: "rgba(15,23,42,0.65)" }}>{children}</p>;
const S = ({ children }) => <p className="text-[11px] mb-5" style={{ color: "rgba(15,23,42,0.40)" }}>{children}</p>;

export default function PeopleCharts() {
  const { lang } = useLang();
  const tr = translations[lang].charts.people;

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <T>{tr.popTitle}</T>
        <S>{tr.popSub}</S>
        <AreaWidget
          data={realPopulation}
          dataKey="total"
          xKey="year"
          color="#10B981"
          height={220}
          formatter={fmt}
          gradientId="peoplePop"
        />
      </GlassCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <T>{tr.genderTitle}</T>
          <S>{tr.genderSub}</S>
          <LineWidget
            data={realPopulation}
            lines={[
              { dataKey: "male",   color: "#06B6D4", name: tr.male   },
              { dataKey: "female", color: "#2563EB", name: tr.female },
            ]}
            xKey="year"
            height={200}
            formatter={fmtK}
            showLegend
          />
        </GlassCard>

        <GlassCard className="p-6">
          <T>{tr.birthTitle}</T>
          <S>{tr.birthSub}</S>
          <BarWidget
            data={realBirthsDeaths}
            bars={[
              { dataKey: "births", color: "#10B981", name: tr.births },
              { dataKey: "deaths", color: "#EF4444", name: tr.deaths },
            ]}
            xKey="year"
            height={200}
            formatter={(v) => v.toLocaleString()}
          />
        </GlassCard>
      </div>
    </div>
  );
}
