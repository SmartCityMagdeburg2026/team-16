"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const LanguageContext = createContext({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("citypulse-lang");
      if (stored === "de" || stored === "en") setLangState(stored);
    } catch {}
  }, []);

  const setLang = useCallback((l) => {
    setLangState(l);
    try { localStorage.setItem("citypulse-lang", l); } catch {}
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
