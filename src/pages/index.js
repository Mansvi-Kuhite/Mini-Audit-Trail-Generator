// src/pages/index.js
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DiffViewer from "../components/DiffViewer";
import { downloadCSV, downloadJSON, openPrintWindow } from "../utils/downloads";
import { getAddedRemoved } from "../lib/diff";

export default function Home() {
  const [content, setContent] = useState("");
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    fetch("/api/versions")
      .then((r) => r.json())
      .then((data) => setVersions(data || []))
      .catch(() => setVersions([]));
  }, []);

  async function saveVersion() {
    const res = await fetch("/api/save-version", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (res.ok) {
      const entry = await res.json();
      setVersions((p) => [...p, entry]);
      setContent("");
    } else {
      alert("Save failed");
    }
  }

  function handleDownloadCSV() {
    downloadCSV("versions.csv", versions);
  }
  function handleDownloadJSON() {
    downloadJSON("versions.json", versions);
  }
  function handleSaveAsPDF() {
    // Build simple html for print
    const html = versions
      .map(
        (v) => `<div class="card">
        <h3>${v.timestamp} — ID: ${v.id}</h3>
        <div><strong>Added:</strong> ${v.addedWords.join(", ") || "None"}</div>
        <div><strong>Removed:</strong> ${v.removedWords.join(", ") || "None"}</div>
        <div><strong>OldLen:</strong> ${v.oldLength} | <strong>NewLen:</strong> ${v.newLength}</div>
        <pre>${escapeHtml(v.contentSnapshot || "")}</pre>
      </div>`
      )
      .join("\n");
    openPrintWindow("Version History", html);
  }

  // small helper
  function escapeHtml(s = "") {
    return s
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  return (
    <div className="app-container">
      <Navbar versionCount={versions.length} />

      <div className="card">
        <div className="editor">
          <label>Enter Content:</label>
          <textarea
            className="editor-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type or paste text here..."
          />
          <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center" }}>
            <button className="btn btn-primary" onClick={saveVersion}>
              Save Version
            </button>
            <button className="btn" onClick={() => setContent("")}>
              Clear
            </button>

            <div style={{ flex: 1 }} />
            <div className="util-row">
              <button className="btn btn-ghost" onClick={handleDownloadCSV}>
                Download CSV
              </button>
              <button className="btn btn-ghost" onClick={handleDownloadJSON}>
                Download JSON
              </button>
              <button className="btn btn-ghost" onClick={handleSaveAsPDF}>
                Print / Save as PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 8 }}>
        <div className="versions-header">Version History</div>

        {versions.slice().reverse().map((v) => {
          // Use added/removed arrays already stored in each entry
         async function deleteVersion(id) {
  if (!confirm("Delete this version?")) return;

  const res = await fetch(`/api/delete-version?id=${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    setVersions((prev) => prev.filter((v) => v.id !== id));
  } else {
    alert("Failed to delete version");
  }
}

          return (
            <div className="version-card" key={v.id}>
              <button
  className="btn btn-ghost"
  style={{ marginTop: 8 }}
  onClick={() => deleteVersion(v.id)}
>
  Delete
</button>

              <div className="meta-line">
                <strong>{v.timestamp}</strong> — ID: {v.id}
              </div>
              <div className="small"><strong>Added:</strong> {v.addedWords.join(", ") || "None"}</div>
              <div className="small"><strong>Removed:</strong> {v.removedWords.join(", ") || "None"}</div>
              <div className="small">
                <strong>Old Length:</strong> {v.oldLength} | <strong>New Length:</strong> {v.newLength}
              </div>

              <div style={{ marginTop: 10 }}>
                <details>
                  <summary style={{ cursor: "pointer", fontWeight: 700 }}>View with highlights</summary>
                  <div style={{ marginTop: 10 }}>
                    <DiffViewer
                      content={v.contentSnapshot}
                      added={v.addedWords.map((x) => x.toLowerCase())}
                      removed={v.removedWords.map((x) => x.toLowerCase())}
                    />
                  </div>
                </details>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
