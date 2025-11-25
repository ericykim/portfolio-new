"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start with dark as default for SSR, will sync on mount
  const [theme, setTheme] = useState<Theme>("dark");

  // After hydration, sync theme from DOM
  // This is intentional one-time sync to match server/client state
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    const currentTheme = isDark ? "dark" : "light";

    if (currentTheme !== theme) {
      setTheme(currentTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Whenever the user explicitly chooses light mode
    if (newTheme === "light") {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
    // Whenever the user explicitly chooses dark mode
    else {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
