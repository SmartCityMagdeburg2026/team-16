"use client";

import { ResponsiveContainer, LineChart, Line } from "recharts";

export default function SparkLine({ data = [], color = "#3b82f6", height = 36 }) {
  const chartData = data.map((v, i) => ({ i, v }));

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.8}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
