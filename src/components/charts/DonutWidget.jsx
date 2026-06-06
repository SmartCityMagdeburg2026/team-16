"use client";

import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
} from "recharts";

const TOOLTIP_STYLE = {
  backgroundColor: "#FFFFFF",
  border: "1px solid rgba(148,163,184,0.24)",
  borderRadius: "10px",
  fontSize: "12px",
  color: "#0F172A",
  padding: "8px 12px",
  boxShadow: "0 4px 12px rgba(148,163,184,0.13)",
};

export default function DonutWidget({
  data,
  height = 220,
  innerRadius = 55,
  outerRadius = 90,
  centerLabel,
  centerValue,
  unit = "%",
  showLegend = true,
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          dataKey="value"
          strokeWidth={0}
          paddingAngle={2}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          formatter={(v) => [`${v}${unit}`, ""]}
        />
        {showLegend && (
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "11px", color: "rgba(15,23,42,0.56)" , paddingTop:"20px"}}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}

