import { categoryColors } from "@/lib/mockData";

export default function CategoryBadge({ category, size = "sm" }) {
  const scheme = categoryColors[category] ?? {
    bg: "rgba(148,163,184,0.12)",
    text: "rgba(15,23,42,0.65)",
    border: "rgba(148,163,184,0.22)",
  };
  const px = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${px}`}
      style={{
        background: scheme.bg,
        color: scheme.text,
        border: `1px solid ${scheme.border}`,
      }}
    >
      {category}
    </span>
  );
}

