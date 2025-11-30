import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { getAddedRemoved } from "../../lib/diff";

const DATA_PATH = path.join(process.cwd(), "data", "versions.json");

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { content } = req.body;
  if (typeof content !== "string") {
    return res.status(400).json({ error: "Content is required" });
  }

  // read previous versions
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  const versions = JSON.parse(raw || "[]");

  const lastContent = versions.length ? versions[versions.length - 1].contentSnapshot : "";

  const diff = getAddedRemoved(lastContent, content);

  const entry = {
    id: uuidv4(),
    timestamp: dayjs().format("YYYY-MM-DD HH:mm"),
    addedWords: diff.addedWords,
    removedWords: diff.removedWords,
    oldLength: diff.oldLength,
    newLength: diff.newLength,
    contentSnapshot: content,
  };

  versions.push(entry);

  fs.writeFileSync(DATA_PATH, JSON.stringify(versions, null, 2));

  return res.status(201).json(entry);
}
