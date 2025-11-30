import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "versions.json");

export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const raw = fs.readFileSync(DATA_PATH, "utf8");
  const versions = JSON.parse(raw || "[]");

  return res.status(200).json(versions);
}
