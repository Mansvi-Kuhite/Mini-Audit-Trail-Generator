import "../styles/global.css";
import { createContext, useState } from "react";

export const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === "dark" ? "theme-dark" : "theme-light"}>
        <Component {...pageProps} />
      </div>
    </ThemeContext.Provider>
  );
}
