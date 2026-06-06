"use client";

import { useState, useMemo } from "react";
import GlassCard from "@/components/ui/GlassCard";
import CategoryBadge from "@/components/ui/CategoryBadge";
import { allDatasets } from "@/lib/mockData";
import { MagnifyingGlass, Download, Funnel, Table, X } from "@phosphor-icons/react";

const ALL_CATS = ["All", "People", "Housing", "Mobility", "Environment", "Economy", "Education"];
const ALL_FMTS = ["All", "CSV", "JSON"];

export default function ExplorerClient() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [activeFmt, setActiveFmt] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return allDatasets.filter((ds) => {
      const matchQuery =
        !query ||
        ds.title.toLowerCase().includes(query.toLowerCase()) ||
        ds.tags.some((t) => t.includes(query.toLowerCase()));
      const matchCat = activeCat === "All" || ds.category === activeCat;
      const matchFmt = activeFmt === "All" || ds.format === activeFmt;
      return matchQuery && matchCat && matchFmt;
    });
  }, [query, activeCat, activeFmt]);

  return (
    <div className="space-y-5">
      {/* Search bar */}
      <GlassCard className="p-4">
        <div className="flex items-center gap-3">
          <MagnifyingGlass size={17} className="shrink-0" style={{ color: "rgba(15,23,42,0.36)" }} />
          <input
            type="text"
            placeholder="Search datasets by name or tagâ€¦"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[14px] outline-none"
            style={{ color: "#0F172A" }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{ color: "rgba(15,23,42,0.36)" }}
              onMouseEnter={e => e.currentTarget.style.color = "rgba(15,23,42,0.70)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(15,23,42,0.36)"}>
              <X size={15} />
            </button>
          )}
        </div>
      </GlassCard>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "rgba(15,23,42,0.40)" }}>
          <Funnel size={13} />
          <span className="uppercase tracking-widest font-semibold">Category</span>
        </div>
        {ALL_CATS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className="px-3 py-1.5 rounded-full text-[12px] font-medium transition-all duration-120"
            style={{
              background: activeCat === cat ? "rgba(37,99,235,0.16)" : "rgba(15,23,42,0.04)",
              color: activeCat === cat ? "#2563EB" : "rgba(15,23,42,0.44)",
              border: `1px solid ${activeCat === cat ? "rgba(37,99,235,0.30)" : "rgba(15,23,42,0.08)"}`,
            }}
          >
            {cat}
          </button>
        ))}

        <div className="w-px h-4 mx-1" style={{ background: "rgba(15,23,42,0.14)" }} />

        {ALL_FMTS.map((fmt) => (
          <button
            key={fmt}
            onClick={() => setActiveFmt(fmt)}
            className="px-3 py-1.5 rounded-full text-[12px] font-medium transition-all duration-120"
            style={{
              background: activeFmt === fmt ? "rgba(37,99,235,0.14)" : "rgba(15,23,42,0.04)",
              color: activeFmt === fmt ? "#2563EB" : "rgba(15,23,42,0.44)",
              border: `1px solid ${activeFmt === fmt ? "rgba(37,99,235,0.28)" : "rgba(15,23,42,0.08)"}`,
            }}
          >
            {fmt}
          </button>
        ))}

        <span className="ml-auto text-[11px]" style={{ color: "rgba(15,23,42,0.32)" }}>
          {filtered.length} dataset{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Dataset list */}
      <GlassCard>
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-[13px]" style={{ color: "rgba(15,23,42,0.32)" }}>
            No datasets match your filters.
          </div>
        ) : (
          <ul className="divide-y" style={{ borderColor: "rgba(148,163,184,0.16)" }}>
            {filtered.map((ds) => (
              <li
                key={ds.id}
                onClick={() => setSelected(ds.id === selected?.id ? null : ds)}
                className="flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors group"
                onMouseEnter={e => e.currentTarget.style.background = "rgba(37,99,235,0.05)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.18)" }}
                >
                  <Table size={14} style={{ color: "rgba(15,23,42,0.44)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-medium truncate transition-colors" style={{ color: "rgba(15,23,42,0.78)" }}>
                    {ds.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-[11px]" style={{ color: "rgba(15,23,42,0.40)" }}>{ds.rows.toLocaleString()} rows</p>
                    <span style={{ color: "rgba(15,23,42,0.22)" }}>Â·</span>
                    <p className="text-[11px]" style={{ color: "rgba(15,23,42,0.40)" }}>Updated {ds.updated}</p>
                    <span style={{ color: "rgba(15,23,42,0.22)" }}>Â·</span>
                    <p className="text-[11px] font-mono" style={{ color: "rgba(15,23,42,0.32)" }}>{ds.format}</p>
                  </div>
                </div>
                <CategoryBadge category={ds.category} />
                <button
                  onClick={(e) => { e.stopPropagation(); }}
                  className="ml-2 p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  style={{ color: "rgba(15,23,42,0.40)" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "rgba(15,23,42,0.70)"; e.currentTarget.style.background = "rgba(15,23,42,0.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(15,23,42,0.40)"; e.currentTarget.style.background = "transparent"; }}
                >
                  <Download size={13} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </GlassCard>

      {/* Detail panel */}
      {selected && (
        <GlassCard className="p-6" glow="amber">
          <div className="flex items-start justify-between mb-4">
            <div>
              <CategoryBadge category={selected.category} size="md" />
              <h3 className="text-[16px] font-semibold mt-2" style={{ color: "#0F172A" }}>{selected.title}</h3>
              <p className="text-[12px] mt-1" style={{ color: "rgba(15,23,42,0.44)" }}>{selected.subcategory}</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="p-1.5 rounded-lg transition-all"
              style={{ color: "rgba(15,23,42,0.36)" }}
              onMouseEnter={e => { e.currentTarget.style.color = "rgba(15,23,42,0.70)"; e.currentTarget.style.background = "rgba(15,23,42,0.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(15,23,42,0.36)"; e.currentTarget.style.background = "transparent"; }}
            >
              <X size={15} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Rows",    value: selected.rows.toLocaleString() },
              { label: "Format",  value: selected.format },
              { label: "Updated", value: selected.updated },
              { label: "Tags",    value: selected.tags.join(", ") },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "rgba(15,23,42,0.36)" }}>{item.label}</p>
                <p className="text-[13px] font-medium" style={{ color: "rgba(15,23,42,0.74)" }}>{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold transition-all"
              style={{ background: "rgba(37,99,235,0.16)", color: "#2563EB", border: "1px solid rgba(37,99,235,0.28)" }}
            >
              <Download size={13} />
              Download {selected.format}
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold transition-all"
              style={{ background: "rgba(15,23,42,0.05)", color: "rgba(15,23,42,0.60)", border: "1px solid rgba(15,23,42,0.14)" }}
            >
              <Table size={13} />
              Preview Data
            </button>
          </div>
        </GlassCard>
      )}
    </div>
  );
}

