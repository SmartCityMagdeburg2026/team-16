"use client";

import { useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Users, Buildings, Train, Leaf,
  ChartBar, GraduationCap, TrendUp, MagnifyingGlass,
  Info, CaretLeft, CaretRight, MapPin, House, MapTrifold,
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

const SIDEBAR_KEY = "sidebar-collapsed";

let sidebarListeners = [];
function emitSidebarChange() { sidebarListeners.forEach(l => l()); }
function subscribeSidebar(cb) {
  sidebarListeners.push(cb);
  return () => { sidebarListeners = sidebarListeners.filter(l => l !== cb); };
}
function getSidebarCollapsed() {
  try { return localStorage.getItem(SIDEBAR_KEY) === "true"; } catch { return false; }
}
function getSidebarCollapsedServer() { return false; }
function setSidebarCollapsed(value) {
  try { localStorage.setItem(SIDEBAR_KEY, String(value)); } catch {}
  emitSidebarChange();
}

export default function Sidebar() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const tr = translations[lang];

  const collapsed = useSyncExternalStore(
    subscribeSidebar,
    getSidebarCollapsed,
    getSidebarCollapsedServer,
  );

  const toggle = useCallback(() => {
    setSidebarCollapsed(!getSidebarCollapsed());
  }, []);

  return (
    <aside
      className="hidden md:flex flex-col shrink-0 h-full border-r relative"
      style={{
        width: collapsed ? 68 : 244,
        minWidth: collapsed ? 68 : 244,
        background: "#0F172A",
        borderColor: "rgba(255,255,255,0.08)",
        transition: "width 0.28s cubic-bezier(0.4,0,0.2,1), min-width 0.28s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* Logo row */}
      <div
        className="flex items-center shrink-0 border-b"
        style={{
          height: 64,
          borderColor: "rgba(255,255,255,0.08)",
          padding: collapsed ? "0 10px" : "0 14px",
          justifyContent: collapsed ? "center" : "space-between",
          transition: "padding 0.28s",
        }}
      >
        <Link
          href="/"
          className="flex items-center overflow-hidden min-w-0"
          style={{ gap: collapsed ? 0 : 10, transition: "gap 0.28s" }}
          title="CityPulse — Magdeburg"
        >
          <div className="w-9 h-9 shrink-0 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="CityPulse Magdeburg"
              width={36}
              height={36}
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <div
            style={{
              overflow: "hidden",
              maxWidth: collapsed ? 0 : 160,
              opacity: collapsed ? 0 : 1,
              transition: "max-width 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.20s",
              whiteSpace: "nowrap",
            }}
          >
            <p className="text-sm font-semibold tracking-tight" style={{ color: "#F8FAFC" }}>CityPulse</p>
            <p className="text-[10px] font-medium tracking-wider uppercase" style={{ color: "rgba(148,163,184,0.65)" }}>Magdeburg</p>
          </div>
        </Link>

        {!collapsed && (
          <button
            onClick={toggle}
            className="flex items-center justify-center rounded-lg transition-colors duration-150"
            style={{ width: 28, height: 28, flexShrink: 0, color: "rgba(148,163,184,0.55)" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#CBD5E1"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(148,163,184,0.55)"; }}
            title="Collapse sidebar"
          >
            <CaretLeft size={14} weight="bold" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav
        className="flex-1 overflow-y-auto"
        style={{ padding: collapsed ? "14px 8px" : "14px 10px" }}
      >
        {!collapsed && (
          <p
            className="pb-2 text-[10px] font-semibold tracking-widest uppercase"
            style={{ color: "rgba(148,163,184,0.40)", paddingLeft: 10 }}
          >
            {tr.ui.explore}
          </p>
        )}
        <div className="space-y-0.5">
          {NAV.map(({ href, key, icon: Icon }) => {
            const label = tr.nav[key];
            const active = href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                className="relative flex items-center rounded-lg text-[13.5px] font-medium select-none transition-colors duration-150"
                style={{
                  gap: collapsed ? 0 : 10,
                  padding: collapsed ? "10px 0" : "9px 10px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  color: active ? "#60A5FA" : "rgba(148,163,184,0.70)",
                  background: active ? "rgba(37,99,235,0.15)" : undefined,
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#CBD5E1"; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(148,163,184,0.70)"; } }}
              >
                {active && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                    style={{ background: "linear-gradient(to bottom, #60A5FA, #2563EB)" }}
                  />
                )}
                <Icon size={17} weight={active ? "fill" : "regular"} className="shrink-0" />
                <span
                  style={{
                    overflow: "hidden",
                    maxWidth: collapsed ? 0 : 160,
                    opacity: collapsed ? 0 : 1,
                    transition: "max-width 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.18s",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                  }}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div
        className="border-t shrink-0"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          padding: collapsed ? "10px 8px" : "10px 10px",
        }}
      >
        {/* Expanded: info text + language toggle */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: collapsed ? 0 : 120,
            opacity: collapsed ? 0 : 1,
            transition: "max-height 0.28s, opacity 0.18s",
            paddingLeft: 10,
          }}
        >
          <p className="text-[10px]" style={{ color: "rgba(148,163,184,0.35)" }}>{tr.ui.refreshed}</p>
          <p className="text-[11px] font-medium mt-0.5" style={{ color: "rgba(148,163,184,0.55)" }}>Dec 2024 · v2.4.0</p>

          {/* Language toggle */}
          <div className="mt-4 mb-1">
            <p className="text-[10px] mb-1.5" style={{ color: "rgba(148,163,184,0.35)" }}>{tr.ui.language}</p>
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
                    padding: "5px 14px",
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    background: lang === l ? "#2563EB" : "transparent",
                    color: lang === l ? "#FFFFFF" : "rgba(148,163,184,0.50)",
                    boxShadow: lang === l ? "0 1px 4px rgba(37,99,235,0.40)" : "none",
                    transition: "all 0.15s cubic-bezier(0.4,0,0.2,1)",
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

        {/* Collapsed: compact language toggle */}
        {collapsed && (
          <div className="flex flex-col items-center gap-1 mb-1">
            {["en", "de"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  width: 36,
                  height: 22,
                  borderRadius: 5,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  background: lang === l ? "#2563EB" : "rgba(255,255,255,0.06)",
                  color: lang === l ? "#FFFFFF" : "rgba(148,163,184,0.45)",
                  border: lang === l ? "none" : "1px solid rgba(255,255,255,0.08)",
                  transition: "all 0.15s",
                  cursor: "pointer",
                }}
                title={`Switch to ${l.toUpperCase()}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={toggle}
          className="mt-2 w-full flex items-center justify-center rounded-lg py-2 gap-2 transition-colors duration-150"
          style={{ color: "rgba(148,163,184,0.50)" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#CBD5E1"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(148,163,184,0.50)"; }}
          title={collapsed ? tr.ui.expand : tr.ui.collapse}
        >
          {collapsed ? <CaretRight size={14} /> : <CaretLeft size={14} />}
          <span
            style={{
              overflow: "hidden",
              maxWidth: collapsed ? 0 : 100,
              opacity: collapsed ? 0 : 1,
              transition: "max-width 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.18s",
              whiteSpace: "nowrap",
              display: "inline-block",
              fontSize: 11,
              fontWeight: 500,
            }}
          >
            {tr.ui.collapse}
          </span>
        </button>
      </div>

      {/* Floating expand tab */}
      {collapsed && (
        <button
          onClick={toggle}
          className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-150 hover:scale-110"
          style={{
            right: -14,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#1E293B",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "2px 0 8px rgba(0,0,0,0.20)",
            color: "#60A5FA",
            zIndex: 10,
          }}
          title={tr.ui.expand}
        >
          <CaretRight size={12} weight="bold" />
        </button>
      )}
    </aside>
  );
}
