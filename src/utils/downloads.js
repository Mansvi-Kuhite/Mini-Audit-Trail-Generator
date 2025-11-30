export function downloadJSON(filename = "versions.json", data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadCSV(filename = "versions.csv", versions = []) {
  if (!Array.isArray(versions)) versions = [];
  const headers = [
    "id",
    "timestamp",
    "addedWords",
    "removedWords",
    "oldLength",
    "newLength",
    "contentSnapshot",
  ];
  const rows = versions.map((v) =>
    headers
      .map((h) => {
        const val = v[h];
        // escape double quotes
        if (Array.isArray(val)) return `"${val.join(" | ").replace(/"/g, '""')}"`;
        return `"${String(val ?? "").replace(/"/g, '""')}"`;
      })
      .join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Opens a new print window with content and triggers print.
 * Useful for saving as PDF through browser's Save as PDF.
 */
export function openPrintWindow(title = "Versions", htmlContent = "") {
  const printWindow = window.open("", "_blank", "width=800,height=900");
  if (!printWindow) return;
  printWindow.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #111; }
          pre { white-space: pre-wrap; background:#f7f7f7; padding:10px; border-radius:6px; }
          h1 { font-size: 20px; }
          .card { margin-bottom: 18px; padding:10px; border:1px solid #ddd; border-radius:8px;}
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  // small timeout to allow browser to render
  setTimeout(() => {
    printWindow.print();
  }, 600);
}
