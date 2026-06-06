// Global design tokens for CityPulse â€” cream/beige theme
// Import from here instead of hardcoding hex values in components.

// â”€â”€ Base palette â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const COLORS = {
  // Amber / gold  (primary brand)
  amber:       "#2563EB",
  amberDark:   "#2563EB",
  amberLight:  "#3B82F6",
  amberDeep:   "#2563EB",

  // Teal  (People category)
  teal:        "#10B981",
  tealDark:    "#0A7C74",
  tealLight:   "#14B8A6",

  // Cyan  (Mobility category)
  cyan:        "#06B6D4",
  cyanDark:    "#0E7490",
  cyanLight:   "#22D3EE",

  // Green  (Environment category)
  green:       "#10B981",
  greenDark:   "#059669",
  greenLight:  "#10B981",

  // Orange  (Economy category)
  orange:      "#EF4444",
  orangeDark:  "#C2410C",
  orangeLight: "#F97316",

  // Blue  (Education category)
  blue:        "#2563EB",
  blueDark:    "#1E3A8A",
  blueLight:   "#3B82F6",

  // Neutral
  slate:       "#64748B",
  slateLight:  "#94A3B8",

  // Background / text (cream theme)
  bg:          "#F8FAFC",
  surface:     "rgba(255,255,255,0.85)",
  border:      "rgba(148,163,184,0.20)",
  text:        "#0F172A",
  textMuted:   "rgba(15,23,42,0.54)",
  textFaint:   "rgba(15,23,42,0.36)",
};

// â”€â”€ Per-category badge colors â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const CATEGORY_COLORS = {
  People:      { bg: `rgba(16,185,129,0.10)`,  text: COLORS.teal,      border: `rgba(16,185,129,0.25)`  },
  Housing:     { bg: `rgba(37,99,235,0.10)`,  text: COLORS.amberDark, border: `rgba(37,99,235,0.25)`  },
  Mobility:    { bg: `rgba(6,182,212,0.10)`,   text: COLORS.cyanDark,  border: `rgba(6,182,212,0.25)`   },
  Environment: { bg: `rgba(16,185,129,0.10)`,   text: COLORS.greenDark, border: `rgba(16,185,129,0.25)`   },
  Economy:     { bg: `rgba(245,158,11,0.10)`,   text: COLORS.amberDeep, border: `rgba(245,158,11,0.25)`  },
  Education:   { bg: `rgba(37,99,235,0.10)`,   text: COLORS.blue,      border: `rgba(37,99,235,0.25)`   },
};

// â”€â”€ Shared chart tooltip style â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const TOOLTIP_STYLE = {
  backgroundColor: "#FFFFFF",
  border:          "1px solid rgba(148,163,184,0.24)",
  borderRadius:    "10px",
  fontSize:        "12px",
  color:           "#0F172A",
  padding:         "8px 12px",
  boxShadow:       "0 4px 12px rgba(148,163,184,0.13)",
};

// â”€â”€ Multi-series chart palette (no purples/violets) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Use these in order when you need 2â€“7 distinct series on one chart.
export const CHART_PALETTE = [
  COLORS.amber,       // 1 â€” amber
  COLORS.cyan,        // 2 â€” cyan
  COLORS.green,       // 3 â€” green
  COLORS.amberLight,  // 4 â€” warm orange
  COLORS.teal,        // 5 â€” teal
  COLORS.amberDeep,   // 6 â€” dark amber
  COLORS.slate,       // 7 â€” neutral grey
];

// â”€â”€ Convenience: axis / grid defaults â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const AXIS_TICK  = { fill: "rgba(15,23,42,0.40)", fontSize: 11 };
export const GRID_STROKE = "rgba(148,163,184,0.13)";

