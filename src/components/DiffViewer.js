import React from "react";

/**
 * DiffViewer
 * Props:
 *  - content (string) : the full content snapshot
 *  - added (array of normalized words)
 *  - removed (array of normalized words)
 *
 * It renders the content tokenized and highlights words present in added/removed lists.
 */
function normalizeToken(token) {
  return token.replace(/[^\w]/g, "").toLowerCase();
}

export default function DiffViewer({ content = "", added = [], removed = [] }) {
  if (!content) return <div className="content-preview">No content</div>;

  // split into tokens, keeping punctuation/whitespace separators
  const tokens = content.split(/(\s+|[^\w\s]+)/g).filter(Boolean);

  return (
    <div className="content-preview">
      {tokens.map((t, i) => {
        const n = normalizeToken(t);
        if (n && added.includes(n)) {
          return (
            <span key={i} className="word-added">
              {t}
            </span>
          );
        }
        if (n && removed.includes(n)) {
          return (
            <span key={i} className="word-removed">
              {t}
            </span>
          );
        }
        return <span key={i}>{t}</span>;
      })}
    </div>
  );
}
