import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "versions.json");

export default function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing id" });
  }

  const raw = fs.readFileSync(DATA_PATH, "utf8");
  let versions = JSON.parse(raw || "[]");

  const newVersions = versions.filter((v) => v.id !== id);

  fs.writeFileSync(DATA_PATH, JSON.stringify(newVersions, null, 2));

  return res.status(200).json({ message: "Version deleted!", id });
}
