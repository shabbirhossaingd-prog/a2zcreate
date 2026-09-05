"use client";

import { useEffect, useState } from "react";

const SunIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 9 9 0 1 0 20.5 14.5Z" />
  </svg>
);

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("a2z-theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  function switchTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("a2z-theme", nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }

  return (
    <button type="button" onClick={switchTheme} className="a2z-theme-toggle" aria-label="Toggle light and black theme">
      <span className="a2z-theme-toggle__icon">{theme === "dark" ? <MoonIcon /> : <SunIcon />}</span>
      <span className="a2z-theme-toggle__text">{theme === "dark" ? "Black" : "Light"}</span>
    </button>
  );
}
