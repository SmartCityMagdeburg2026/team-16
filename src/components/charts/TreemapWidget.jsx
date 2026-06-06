"use client";

import { ResponsiveContainer, Treemap, Tooltip } from "recharts";
import { formatNumber } from "@/lib/utils";

const TOOLTIP_STYLE = {
  backgroundColor: "#FFFFFF",
  border: "1px solid rgba(148,163,184,0.24)",
  borderRadius: "10px",
  fontSize: "12px",
  color: "#0F172A",
  padding: "8px 12px",
  boxShadow: "0 4px 12px rgba(148,163,184,0.13)",
};

function textColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const l = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return l > 0.55 ? "#0F172A" : "#FFFFFF";
}

function TreemapCell(props) {
  const { x, y, width, height, name, value, payload } = props;
  const node = payload ?? props;
  const tons = node.tons ?? value ?? 0;
  const color = node.color ?? "#64748b";
  const percent = node.percent ?? "";
  if (width <= 0 || height <= 0) return null;

  const fill = textColor(color);
  const pad = 8;
  const showLabel = width > 64 && height > 36;
  const showValue = width > 64 && height > 56;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        stroke="#FFFFFF"
        strokeWidth={2}
        rx={6}
      />
      {showLabel && (
        <text
          x={x + pad}
          y={y + pad + 12}
          fill={fill}
          fontSize={11}
          fontWeight={600}
        >
          {name}
        </text>
      )}
      {showValue && (
        <>
          <text x={x + pad} y={y + pad + 28} fill={fill} fontSize={10} opacity={0.9}>
            {formatNumber(tons)} t
          </text>
          <text x={x + pad} y={y + pad + 42} fill={fill} fontSize={10} opacity={0.8}>
            {percent}%
          </text>
        </>
      )}
      {!showLabel && width > 28 && height > 20 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={fill}
          fontSize={10}
          fontWeight={600}
        >
          {percent}%
        </text>
      )}
    </g>
  );
}

export default function TreemapWidget({
  data,
  labelKey = "type",
  valueKey = "tons",
  height = 300,
}) {
  const total = data.reduce((sum, d) => sum + d[valueKey], 0);
  const treeData = data.map((d) => ({
    name: d[labelKey],
    tons: d[valueKey],
    color: d.color,
    percent: ((d[valueKey] / total) * 100).toFixed(1),
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <Treemap
        data={treeData}
        dataKey="tons"
        aspectRatio={4 / 3}
        stroke="#FFFFFF"
        content={TreemapCell}
      >
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          formatter={(_, __, { payload }) => [
            `${formatNumber(payload.tons)} t (${payload.percent}%)`,
            payload.name,
          ]}
        />
      </Treemap>
    </ResponsiveContainer>
  );
}

