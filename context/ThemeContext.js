"use client";

import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({ mode: "light", toggle: () => {} });

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  const [isMounted, setIsMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialMode = storedTheme || (prefersDark ? "dark" : "light");
      setMode(initialMode);
      document.documentElement.classList.toggle("dark", initialMode === "dark");
    } catch (_) {
      // no-op
    } finally {
      setIsMounted(true);
    }
  }, []);

  // Apply theme changes and persist
  useEffect(() => {
    if (!isMounted) return;
    document.documentElement.classList.toggle("dark", mode === "dark");
    try {
      localStorage.setItem("theme", mode);
    } catch (_) {
      // no-op
    }
  }, [mode, isMounted]);

  const toggle = () => {
    setMode((previousMode) => (previousMode === "light" ? "dark" : "light"));
  };

  return <ThemeContext.Provider value={{ toggle, mode }}>{children}</ThemeContext.Provider>;
};