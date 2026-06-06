import fs from "fs/promises";
import path from "path";
import { pathToFileURL } from "url";

const DATA_DIR = path.join(process.cwd(), "data");

function resolveJsonPath(filePath) {
  return path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
}

function resolveDataFilePath(filename) {
  const safeName = path.basename(filename);

  if (!safeName.endsWith(".json")) {
    throw new Error("Only .json files are supported");
  }

  return path.join(DATA_DIR, safeName);
}

export async function readJsonFile(filePath) {
  const resolvedPath = resolveJsonPath(filePath);
  const raw = await fs.readFile(resolvedPath, "utf-8");
  return JSON.parse(raw);
}

export function extractColumnsAndRows(data) {
  const columns = Array.isArray(data.columns) ? data.columns : [];
  const rows = Array.isArray(data.rows) ? data.rows : [];

  return { columns, rows };
}

export function toTable(columns, rows) {
  const headers = columns.map((col) => col.label || col.key);

  const tableRows = rows.map((row) =>
    Object.fromEntries(
      columns.map((col) => [col.label || col.key, row[col.key] ?? null])
    )
  );

  return { headers, rows: tableRows };
}

export async function extractTableFromFile(filePath) {
  const data = await readJsonFile(filePath);
  const { columns, rows } = extractColumnsAndRows(data);
  return toTable(columns, rows);
}

export async function extractTableFromDataFile(filename) {
  const filePath = resolveDataFilePath(filename);
  return extractTableFromFile(filePath);
}

function isMainModule() {
  const entry = process.argv[1];
  if (!entry) return false;
  return import.meta.url === pathToFileURL(path.resolve(entry)).href;
}

if (isMainModule()) {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error("Usage: node src/app/extract-data.js <path-to-json>");
    process.exit(1);
  }

  try {
    const { rows } = await extractTableFromFile(filePath);
    console.table(rows);
  } catch (error) {
    console.error(`Failed to read table from ${filePath}:`, error.message);
    process.exit(1);
  }
}
