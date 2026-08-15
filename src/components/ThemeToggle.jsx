import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const STORAGE_KEY = "theme";

const readTheme = () => document.documentElement.dataset.theme || "dark";

const ThemeToggle = ({ className = "" }) => {
  // The prerendered HTML has no theme baked in — the inline script in
  // index.html applies it before paint. Rendering the icon only after mount
  // keeps the server and client markup identical, so hydration stays clean.
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const toggle = () => {
    const next = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);

    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private browsing or blocked storage — the theme still applies for
      // this page view, it just will not be remembered.
    }

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = next === "dark" ? "#050816" : "#f6f7fb";
  };

  const isDark = theme !== "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme === null
          ? "Toggle colour theme"
          : `Switch to ${isDark ? "light" : "dark"} theme`
      }
      title="Toggle theme"
      className={`w-9 h-9 shrink-0 rounded-xl border border-ink/[0.08] bg-ink/[0.03] text-secondary hover:text-ink hover:border-ink/20 transition-colors flex items-center justify-center ${className}`}
    >
      {/* Nothing renders until mounted, which keeps SSR output stable. */}
      {theme !== null &&
        (isDark ? <FiSun size={16} /> : <FiMoon size={16} />)}
    </button>
  );
};

export default ThemeToggle;
