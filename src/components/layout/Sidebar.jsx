"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Users, Buildings, Train, Leaf,
  ChartBar, GraduationCap, TrendUp, MagnifyingGlass,
  Info, MapPin, House, MapTrifold, List, X,
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

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const tr = translations[lang];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [overflowFrom, setOverflowFrom] = useState(NAV.length);
  const navRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    function measure() {
      if (!navRef.current) return;
      const containerWidth = navRef.current.offsetWidth;
      // Reserve space for logo (~200px) + lang toggle (~120px)
      const available = containerWidth - 320;
      let consumed = 0;
      let cutoff = NAV.length;
      for (let i = 0; i < itemRefs.current.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        consumed += el.offsetWidth + 4;
        if (consumed > available) { cutoff = i; break; }
      }
      setOverflowFrom(cutoff);
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (navRef.current) ro.observe(navRef.current);
    return () => ro.disconnect();
  }, [lang]);

  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const visibleNav  = NAV.slice(0, overflowFrom);
  const overflowNav = NAV.slice(overflowFrom);

  return (
    <>
      {/* ── Top bar ── */}
      <header
        ref={navRef}
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
          height: 56,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          position: "sticky",
          top: 0,
          zIndex: 50,
          width: "100%",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            flexShrink: 0,
          }}
          title="CityPulse — Magdeburg"
        >
          <div style={{ width: 32, height: 32, flexShrink: 0 }}>
            <Image
              src="/logo.png"
              alt="CityPulse Magdeburg"
              width={32}
              height={32}
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
              priority
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", letterSpacing: "-0.01em" }}>
              CityPulse
            </span>
            <span style={{ fontSize: 9, fontWeight: 500, color: "#94A3B8", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 1 }}>
              Magdeburg
            </span>
          </div>
        </Link>

        {/* Divider */}
        <div style={{ width: 1, height: 24, background: "#E2E8F0", marginLeft: 20, flexShrink: 0 }} />

        {/* Spacer — pushes nav to the right */}
        <div style={{ flex: 1 }} />

        {/* ── Desktop nav items (right-aligned) ── */}
        <nav
          className="hidden md:flex"
          style={{
            alignItems: "center",
            gap: 2,
            flexShrink: 0,
          }}
        >
          {visibleNav.map(({ href, key, icon: Icon }, i) => {
            const label = tr.nav[key];
            const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                ref={el => (itemRefs.current[i] = el)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 10px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 12.5,
                  fontWeight: 500,
                  color: active ? "#2563EB" : "#475569",
                  background: active ? "#EFF6FF" : "transparent",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  position: "relative",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "#F1F5F9"; e.currentTarget.style.color = "#0F172A"; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#475569"; } }}
              >
                <Icon size={14} weight={active ? "fill" : "regular"} />
                {label}
                {active && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: -1,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "60%",
                      height: 2,
                      borderRadius: 2,
                      background: "linear-gradient(to right, #60A5FA, #2563EB)",
                    }}
                  />
                )}
              </Link>
            );
          })}

          {/* "More" overflow dropdown */}
          {overflowNav.length > 0 && (
            <div ref={moreRef} style={{ position: "relative", flexShrink: 0 }}>
              <button
                onClick={() => setMoreOpen(o => !o)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: "none",
                  background: moreOpen ? "#F1F5F9" : "transparent",
                  color: "#475569",
                  fontSize: 12.5,
                  fontWeight: 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#F1F5F9"; e.currentTarget.style.color = "#0F172A"; }}
                onMouseLeave={e => { if (!moreOpen) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#475569"; } }}
              >
                <List size={14} />
                {tr.ui?.more ?? "More"}
                <span style={{ fontSize: 10, marginLeft: 2, opacity: 0.5 }}>▾</span>
              </button>

              {moreOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: 12,
                    padding: "6px",
                    minWidth: 180,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                    zIndex: 100,
                  }}
                >
                  {overflowNav.map(({ href, key, icon: Icon }) => {
                    const label = tr.nav[key];
                    const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setMoreOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 9,
                          padding: "8px 12px",
                          borderRadius: 8,
                          textDecoration: "none",
                          fontSize: 13,
                          fontWeight: 500,
                          color: active ? "#2563EB" : "#475569",
                          background: active ? "#EFF6FF" : "transparent",
                          transition: "background 0.12s, color 0.12s",
                        }}
                        onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "#F1F5F9"; e.currentTarget.style.color = "#0F172A"; } }}
                        onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#475569"; } }}
                      >
                        <Icon size={14} weight={active ? "fill" : "regular"} />
                        {label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Divider */}
        <div className="hidden md:block" style={{ width: 1, height: 24, background: "#E2E8F0", margin: "0 16px", flexShrink: 0 }} />

        {/* ── Language toggle + version ── */}
        <div
          className="hidden md:flex"
          style={{ alignItems: "center", gap: 10, flexShrink: 0 }}
        >
          <span style={{ fontSize: 10, color: "#CBD5E1", whiteSpace: "nowrap" }}>
            Dec 2024 · v2.4.0
          </span>
          <div
            style={{
              display: "flex",
              background: "#F1F5F9",
              borderRadius: 8,
              padding: 3,
              border: "1px solid #E2E8F0",
              gap: 2,
            }}
          >
            {["en", "de"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  background: lang === l ? "#2563EB" : "transparent",
                  color: lang === l ? "#FFFFFF" : "#94A3B8",
                  boxShadow: lang === l ? "0 1px 4px rgba(37,99,235,0.30)" : "none",
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

        {/* ── Mobile hamburger ── */}
        <button
          className="flex md:hidden"
          onClick={() => setMobileOpen(o => !o)}
          style={{
            marginLeft: "auto",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            border: "none",
            background: "transparent",
            color: "#475569",
            cursor: "pointer",
          }}
        >
          {mobileOpen ? <X size={18} /> : <List size={18} />}
        </button>
      </header>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            top: 56,
            zIndex: 40,
            background: "rgba(0,0,0,0.25)",
          }}
          onClick={() => setMobileOpen(false)}
        >
          <nav
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              background: "#FFFFFF",
              borderBottom: "1px solid #E2E8F0",
              padding: "10px 12px 16px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              {NAV.map(({ href, key, icon: Icon }) => {
                const label = tr.nav[key];
                const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "9px 12px",
                      borderRadius: 8,
                      textDecoration: "none",
                      fontSize: 13,
                      fontWeight: 500,
                      color: active ? "#2563EB" : "#475569",
                      background: active ? "#EFF6FF" : "transparent",
                    }}
                  >
                    <Icon size={15} weight={active ? "fill" : "regular"} />
                    {label}
                  </Link>
                );
              })}
            </div>

            <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: 4, paddingRight: 4 }}>
              <span style={{ fontSize: 10, color: "#CBD5E1" }}>Dec 2024 · v2.4.0</span>
              <div
                style={{
                  display: "flex",
                  background: "#F1F5F9",
                  borderRadius: 8,
                  padding: 3,
                  border: "1px solid #E2E8F0",
                  gap: 2,
                }}
              >
                {["en", "de"].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: 6,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      background: lang === l ? "#2563EB" : "transparent",
                      color: lang === l ? "#FFFFFF" : "#94A3B8",
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
          </nav>
        </div>
      )}
    </>
  );
}