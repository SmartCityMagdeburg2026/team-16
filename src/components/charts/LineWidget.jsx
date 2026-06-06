"use client";

import {
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
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

export default function LineWidget({
  data,
  lines,
  xKey = "year",
  height = 220,
  formatter,
  unit = "",
  showLegend = false,
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
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
          formatter={(v, name) => [formatter ? formatter(v) : v + unit, name]}
          cursor={{ stroke: "rgba(148,163,184,0.22)" }}
        />
        {showLegend && (
          <Legend
            wrapperStyle={{ fontSize: "11px", color: "rgba(15,23,42,0.54)" }}
          />
        )}
        {lines.map(({ dataKey, color, name }) => (
          <Line
            key={dataKey}
            type="monotone"
            dataKey={dataKey}
            name={name ?? dataKey}
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: color, strokeWidth: 0 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}


