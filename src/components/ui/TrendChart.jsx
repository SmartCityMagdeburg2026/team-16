// components/TrendChart.jsx

"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#60a5fa",
  "#34d399",
  "#f472b6",
  "#fb923c",
  "#a78bfa",
];

export default function TrendChart({ trend }) {
  const chartData = trend.years.map((year, index) => {
    const point = {
      year: String(year),
    };

    trend.series.forEach((series) => {
      point[series.label] = series.values[index];
    });

    return point;
  });

  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <LineChart data={chartData}>
        <XAxis
          dataKey="year"
          stroke="#6b7280"
          tick={{ fill: "#9ca3af" }}
        />

        <YAxis
          stroke="#6b7280"
          tick={{ fill: "#9ca3af" }}
          width={80}
        />

        <Tooltip
          contentStyle={{
            background: "#111827",
            border: "1px solid #374151",
          }}
          labelStyle={{
            color: "#f9fafb",
          }}
        />

        <Legend />

        {trend.series.map((series, index) => (
          <Line
            key={series.key}
            dataKey={series.label}
            stroke={
              COLORS[index % COLORS.length]
            }
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}