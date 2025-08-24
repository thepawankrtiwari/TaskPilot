import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react"; // modern icons

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-pressed={dark}
      aria-label="Toggle dark mode"
      className="inline-flex items-center gap-2 rounded-full px-3 py-2 border 
                 bg-gray-100 dark:bg-gray-800 
                 text-gray-900 dark:text-gray-100 
                 shadow hover:scale-110 transition-transform duration-200"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
      <span className="text-sm">{dark ? "Light" : "Dark"}</span>
    </button>
  );
}

export default ThemeToggle;
