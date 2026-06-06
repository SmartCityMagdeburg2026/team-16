import fs from 'fs/promises';
import path from 'path';
import { config } from '@/lib/config.js';

const DATA_ROOT = path.join(process.cwd(), config.dataRoot);

/**
 * List all category directories under DATA_ROOT
 */
export async function listCategories() {
  const entries = await fs.readdir(DATA_ROOT, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
}

/**
 * List all dataset filenames within a category directory
 */
export async function listDatasetFiles(category) {
  const categoryPath = path.join(DATA_ROOT, category);
  const entries = await fs.readdir(categoryPath, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith('.json'))
    .map((e) => e.name);
}

/**
 * Load and parse a single JSON dataset file.
 * Returns null if the file does not exist.
 */
export async function loadDataset(category, filename) {
  const filePath = path.join(DATA_ROOT, category, filename);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    throw err;
  }
}

/**
 * Load all datasets within a category.
 * Skips files that fail to parse (logs warning).
 */
export async function loadAllDatasetsInCategory(category) {
  const files = await listDatasetFiles(category);
  const results = await Promise.allSettled(
    files.map((file) => loadDataset(category, file))
  );

  return results
    .map((result, i) => {
      if (result.status === 'fulfilled' && result.value !== null) {
        return { file: files[i], data: result.value };
      }
      console.warn(`[dataLoader] Failed to load: ${category}/${files[i]}`);
      return null;
    })
    .filter(Boolean);
}

/**
 * Resolve a dataset slug (e.g. "arbeitslose") to its filename.
 * Tries exact match first, then slug-based match.
 */
export async function resolveDatasetFilename(category, slug) {
  const files = await listDatasetFiles(category);

  if (files.includes(`${slug}.json`)) return `${slug}.json`;

  const match = files.find((f) => fileToSlug(f) === slug);
  return match || null;
}

/**
 * Convert a filename like "aufwendungen-des-sozialen-dienstes.json"
 * to a URL-safe slug "aufwendungen-des-sozialen-dienstes"
 */
export function fileToSlug(filename) {
  return filename.replace(/\.json$/, '');
}
