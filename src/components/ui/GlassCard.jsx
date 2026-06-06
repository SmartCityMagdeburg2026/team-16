import { cn } from "@/lib/utils";

export default function GlassCard({ className, children, glow, style }) {
  const glowMap = {
    teal:  "0 0 32px rgba(16,185,129,0.14)",
    green: "0 0 32px rgba(16,185,129,0.14)",
    amber: "0 0 32px rgba(37,99,235,0.18)",
    cyan:  "0 0 32px rgba(6,182,212,0.14)",
    rose:  "0 0 32px rgba(239,68,68,0.14)",
    blue:  "0 0 32px rgba(37,99,235,0.12)",
  };

  return (
    <div
      className={cn("rounded-2xl overflow-hidden", className)}
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(148,163,184,0.22)",
        boxShadow: glow
          ? (glowMap[glow] ?? "0 2px 8px rgba(15,23,42,0.08)")
          : "0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
