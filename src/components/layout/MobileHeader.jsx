"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  List, X, Lightning, House, Users, Buildings, Train, Leaf,
  ChartBar, GraduationCap, TrendUp, MagnifyingGlass, Info, MapPin, MapTrifold,
} from "@phosphor-icons/react";
import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const NAV = [
  { href: "/",            key: "home",        icon: MapPin          },
  { href: "/overview",    key: "overview",    icon: ChartBar        },
  { href: "/map",         key: "map",         icon: MapTrifold      },
  { href: "/people",      key: "people",      icon: Users           },
  { href: "/housing",     key: "housing",     icon: Buildings       },
  { href: "/mobility",    key: "mobility",    icon: Train           },
  { href: "/environment", key: "environment", icon: Leaf            },
  { href: "/economy",     key: "economy",     icon: House           },
  { href: "/education",   key: "education",   icon: GraduationCap   },
  { href: "/trends",      key: "trends",      icon: TrendUp         },
  { href: "/explorer",    key: "explorer",    icon: MagnifyingGlass },
  { href: "/about",       key: "about",       icon: Info            },
];

export default function MobileHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const tr = translations[lang];

  return (
    <>
      {/* Top bar — mobile only */}
      <header
        className="md:hidden flex items-center justify-between px-4 py-3 border-b shrink-0"
        style={{ background: "#0F172A", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)" }}
          >
            <Lightning size={14} weight="fill" className="text-white" />
          </div>
          <span className="text-[15px] font-semibold" style={{ color: "#F8FAFC" }}>CityPulse</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Language toggle in header */}
          <div
            className="flex"
            style={{
              background: "rgba(255,255,255,0.07)",
              borderRadius: 7,
              padding: 2,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {["en", "de"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  padding: "3px 10px",
                  borderRadius: 5,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  background: lang === l ? "#2563EB" : "transparent",
                  color: lang === l ? "#FFFFFF" : "rgba(148,163,184,0.55)",
                  transition: "all 0.15s",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={() => setOpen(o => !o)}
            className="p-2 rounded-lg transition-all"
            style={{ color: "rgba(148,163,184,0.70)" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#CBD5E1"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(148,163,184,0.70)"; }}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </header>

      {/* Drawer */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-50 flex"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-[260px] h-full flex flex-col py-4"
            style={{ background: "#0F172A", borderRight: "1px solid rgba(255,255,255,0.08)" }}
            onClick={e => e.stopPropagation()}
          >
            <nav className="px-3 space-y-0.5 mt-2 flex-1 overflow-y-auto">
              {NAV.map(({ href, key, icon: Icon }) => {
                const label = tr.nav[key];
                const active = href === "/"
                  ? pathname === "/"
                  : pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all"
                    style={{
                      color: active ? "#60A5FA" : "rgba(148,163,184,0.70)",
                      background: active ? "rgba(37,99,235,0.15)" : "transparent",
                    }}
                  >
                    <Icon size={18} weight={active ? "fill" : "regular"} className="shrink-0" />
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Language toggle in drawer footer */}
            <div
              className="mx-4 mt-4 pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[10px] mb-2 font-semibold tracking-widest uppercase" style={{ color: "rgba(148,163,184,0.35)" }}>
                {tr.ui.language}
              </p>
              <div
                className="flex"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 8,
                  padding: 3,
                  width: "fit-content",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {["en", "de"].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    style={{
                      padding: "6px 18px",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      background: lang === l ? "#2563EB" : "transparent",
                      color: lang === l ? "#FFFFFF" : "rgba(148,163,184,0.50)",
                      boxShadow: lang === l ? "0 1px 4px rgba(37,99,235,0.40)" : "none",
                      transition: "all 0.15s",
                      cursor: "pointer",
                      border: "none",
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1" style={{ background: "rgba(0,0,0,0.50)" }} />
        </div>
      )}
    </>
  );
}
