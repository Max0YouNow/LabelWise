
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  // Enhanced contrast values with new color scheme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark' || (theme === 'system' && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      // Maximum contrast for dark theme with pure black background
      root.style.setProperty('--foreground-contrast', '245 245 245');
      root.style.setProperty('--card-contrast', '26 26 26');
      
      // Set higher contrast CSS variables
      root.style.setProperty('--muted-foreground', '207 207 207');
      root.style.setProperty('--border-opacity', '0.5');
      
      // Add high contrast class to enable additional CSS selectors
      root.classList.add('high-contrast');
    } else {
      // Default contrast for light theme
      root.style.setProperty('--foreground-contrast', '13 13 13');
      root.style.setProperty('--card-contrast', '245 241 234');
      root.style.setProperty('--border-opacity', '0.3');
      root.classList.remove('high-contrast');
    }
    
    // Set a CSS variable to reduce animations globally
    root.style.setProperty('--reduced-motion', 'true');
    
    // Apply custom color scheme with new color palette
    document.body.style.setProperty('--color-bg', theme === 'dark' ? '#0D0D0D' : '#F5F1EA');
    document.body.style.setProperty('--color-card', theme === 'dark' ? '#1A1A1A' : '#DBD5BE');
    document.body.style.setProperty('--color-primary', '#FFD43B');  // Yellow CTA
    document.body.style.setProperty('--color-accent', '#32D74B');   // Green success
    document.body.style.setProperty('--color-warning', '#FFD60A');  // Yellow warning
    document.body.style.setProperty('--color-danger', '#FF453A');   // Red danger
    document.body.style.setProperty('--color-text', '#F5F5F5');     // Main text
    document.body.style.setProperty('--color-subtext', '#CFCFCF');  // Secondary text
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
