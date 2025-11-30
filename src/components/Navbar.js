import { useContext } from "react";
import { ThemeContext } from "../pages/_app";

export default function Navbar({ versionCount }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="header">
      <div style={{ flex: 1 }} />
      <div className="title">Mini Audit Trail Generator</div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div className="small" style={{ marginRight: 6 }}>
          Versions: <strong>{versionCount}</strong>
        </div>
        <button
          className="btn btn-ghost"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
}
