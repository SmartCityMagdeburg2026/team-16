"use client";

import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import GlassCard from "@/components/ui/GlassCard";
import LineWidget from "@/components/charts/LineWidget";
import BarWidget from "@/components/charts/BarWidget";
import DonutWidget from "@/components/charts/DonutWidget";
import { realStudents } from "@/lib/realData";
import { educationAttainment } from "@/lib/mockData";

const fmtK = (v) => (v / 1000).toFixed(0) + "k";
const T = ({ children }) => <p className="text-[13px] font-semibold mb-1" style={{ color: "rgba(15,23,42,0.65)" }}>{children}</p>;
const S = ({ children }) => <p className="text-[11px] mb-5" style={{ color: "rgba(15,23,42,0.40)" }}>{children}</p>;

export default function EducationCharts() {
  const { lang } = useLang();
  const tr = translations[lang].charts.education;

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard className="p-6 lg:col-span-2">
          <T>{tr.studTitle}</T>
          <S>{tr.studSub}</S>
          <LineWidget
            data={realStudents}
            lines={[
              { dataKey: "total",    color: "#2563EB", name: tr.total    },
              { dataKey: "domestic", color: "#06B6D4", name: tr.domestic },
              { dataKey: "foreign",  color: "#10B981", name: tr.foreign  },
            ]}
            xKey="year"
            height={210}
            formatter={fmtK}
            showLegend
          />
        </GlassCard>

        <GlassCard className="p-6">
          <T>{tr.attTitle}</T>
          <p className="text-[11px] mb-2" style={{ color: "rgba(15,23,42,0.40)" }}>Population 25+ - 2024</p>
          <DonutWidget data={educationAttainment} height={230} innerRadius={60} outerRadius={95} />
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <T>{tr.origTitle}</T>
        <S>{tr.origSub}</S>
        <BarWidget
          data={realStudents}
          bars={[
            { dataKey: "domestic", color: "#06B6D4", name: tr.domestic },
            { dataKey: "foreign",  color: "#10B981", name: tr.foreign  },
          ]}
          xKey="year"
          height={200}
          formatter={fmtK}
          stacked
        />
      </GlassCard>
    </div>
  );
}
