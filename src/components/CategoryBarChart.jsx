// components/CategoryBarChart.jsx

"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function CategoryBarChart({
  data,
}) {
  return (
    <ResponsiveContainer
      width="100%"
      height={400}
    >
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />

        <Tooltip />

        <Bar dataKey="count" />
      </BarChart>
    </ResponsiveContainer>
  );
}