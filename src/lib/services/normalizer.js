import { fileToSlug } from '@/lib/loader/dataLoader.js';

/**
 * Normalize a raw JSON dataset into a consistent internal shape.
 * Guards against missing fields and enforces expected types.
 *
 * @param {object} raw      - Parsed JSON from disk
 * @param {string} category - Directory name the file lives in
 * @param {string} filename - Original filename (e.g. "arbeitslose.json")
 */
export function normalizeDataset(raw, category, filename) {
  const slug = fileToSlug(filename);

  return {
    id: raw.id ?? slug,
    slug,
    title: raw.title ?? slug,
    category: raw.category ?? category,
    subcategory: raw.subcategory ?? null,
    description: raw.description ?? null,
    columns: normalizeColumns(raw.columns),
    rows: normalizeRows(raw.rows, raw.columns),
    meta: extractMeta(raw, category, slug),
  };
}

/**
 * Normalize columns array.
 * Each column: { key, label, type }
 */
function normalizeColumns(columns) {
  if (!Array.isArray(columns)) return [];

  return columns.map((col) => {
    if (typeof col === 'string') {
      return { key: col, label: col, type: 'string' };
    }
    return {
      key: col.key ?? col.name ?? String(col),
      label: col.label ?? col.name ?? col.key ?? String(col),
      type: col.type ?? 'string',
    };
  });
}

/**
 * Normalize rows.
 * Accepts either array-of-arrays or array-of-objects.
 * Always outputs array-of-objects keyed by column.key.
 */
function normalizeRows(rows, columns) {
  if (!Array.isArray(rows)) return [];
  if (rows.length === 0) return [];

  const normalizedCols = normalizeColumns(columns);

  // Already array-of-objects
  if (typeof rows[0] === 'object' && !Array.isArray(rows[0])) {
    return rows;
  }

  // Array-of-arrays → array-of-objects
  return rows.map((row) => {
    const obj = {};
    normalizedCols.forEach((col, i) => {
      obj[col.key] = row[i] ?? null;
    });
    return obj;
  });
}

/**
 * Extract dataset-level metadata from the raw file.
 * Used for listing endpoints that don't need full rows.
 */
function extractMeta(raw, category, slug) {
  const rows = Array.isArray(raw.rows) ? raw.rows : [];
  const columns = Array.isArray(raw.columns) ? raw.columns : [];

  return {
    rowCount: rows.length,
    columnCount: columns.length,
    source: raw.source ?? null,
    updatedAt: raw.updatedAt ?? raw.updated_at ?? null,
    tags: Array.isArray(raw.tags) ? raw.tags : [],
  };
}

/**
 * Strip rows from a normalized dataset, returning only metadata.
 * Used for listing endpoints to avoid sending large payloads.
 */
export function toMetaSummary(normalized) {
  const { rows, columns, ...rest } = normalized;
  return {
    ...rest,
    meta: {
      ...normalized.meta,
      columnKeys: columns.map((c) => c.key),
    },
  };
}
