
// components/DatasetPieChart.jsx

"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DatasetPieChart({
  data,
}) {
  return (
    <ResponsiveContainer
      width="100%"
      height={400}
    >
      <PieChart>

        <Pie
          data={data}
          dataKey="count"
          nameKey="name"
        />

        <Tooltip />

      </PieChart>
    </ResponsiveContainer>
  );
}