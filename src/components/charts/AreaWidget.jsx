"use client";

import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

const TOOLTIP_STYLE = {
  backgroundColor: "#FFFFFF",
  border: "1px solid rgba(148,163,184,0.25)",
  borderRadius: "10px",
  fontSize: "12px",
  color: "#0F172A",
  padding: "8px 12px",
  boxShadow: "0 4px 16px rgba(15,23,42,0.10)",
};

export default function AreaWidget({
  data,
  dataKey,
  xKey = "year",
  color = "#2563EB",
  height = 200,
  formatter,
  gradientId,
  unit = "",
}) {
  const gId = gradientId ?? `grad-${dataKey}`;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor={color} stopOpacity={0.22} />
            <stop offset="95%" stopColor={color} stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.13)" vertical={false} />
        <XAxis
          dataKey={xKey}
          tick={{ fill: "rgba(15,23,42,0.40)", fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fill: "rgba(15,23,42,0.40)", fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          width={46}
          tickFormatter={formatter}
        />
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          itemStyle={{ color }}
          formatter={(v) => [formatter ? formatter(v) : v + unit, dataKey]}
          cursor={{ stroke: "rgba(148,163,184,0.22)" }}
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gId})`}
          dot={false}
          activeDot={{ r: 4, fill: color, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}


