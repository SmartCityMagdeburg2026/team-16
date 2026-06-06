/**
 * Chart Transformer
 *
 * Converts a normalized dataset into chart-ready data structures.
 * Supports multiple chart types. The frontend decides which type to render —
 * this layer only prepares the data shape.
 *
 * Supported types: bar, line, pie, table (default fallback)
 */

/**
 * Entry point: transform a normalized dataset into chart payload.
 *
 * @param {object} dataset  - Fully normalized dataset (with columns + rows)
 * @param {object} options
 * @param {string} [options.type]      - Chart type hint: 'bar'|'line'|'pie'|'table'
 * @param {string} [options.labelKey]  - Column key to use as X-axis / labels
 * @param {string} [options.valueKey]  - Column key to use as primary value series
 * @param {string[]} [options.valueKeys] - Multiple value series (overrides valueKey)
 */
export function transformForChart(dataset, options = {}) {
  const { columns, rows } = dataset;
  const { type = inferChartType(columns, rows) } = options;

  const labelKey = options.labelKey ?? inferLabelKey(columns);
  const valueKeys = options.valueKeys
    ?? (options.valueKey ? [options.valueKey] : inferValueKeys(columns, labelKey));

  const base = {
    type,
    datasetId: dataset.id,
    datasetTitle: dataset.title,
    labelKey,
    valueKeys,
  };

  switch (type) {
    case 'pie':
      return { ...base, ...buildPieData(rows, labelKey, valueKeys[0]) };
    case 'bar':
    case 'line':
      return { ...base, ...buildSeriesData(rows, labelKey, valueKeys) };
    case 'table':
    default:
      return { ...base, ...buildTableData(columns, rows) };
  }
}

// ---------------------------------------------------------------------------
// Chart-type builders
// ---------------------------------------------------------------------------

function buildSeriesData(rows, labelKey, valueKeys) {
  const labels = rows.map((row) => String(row[labelKey] ?? ''));

  const series = valueKeys.map((key) => ({
    key,
    label: key,
    data: rows.map((row) => parseNumeric(row[key])),
  }));

  return { labels, series };
}

function buildPieData(rows, labelKey, valueKey) {
  const slices = rows.map((row) => ({
    label: String(row[labelKey] ?? ''),
    value: parseNumeric(row[valueKey]),
  }));

  return { slices };
}

function buildTableData(columns, rows) {
  return {
    columns: columns.map((c) => ({ key: c.key, label: c.label })),
    rows,
  };
}

// ---------------------------------------------------------------------------
// Inference helpers — used when the caller doesn't specify keys/type
// ---------------------------------------------------------------------------

/**
 * Guess which column should be the label axis.
 * Prefers string-typed columns that appear first.
 */
function inferLabelKey(columns) {
  const stringCol = columns.find((c) => c.type === 'string' || c.type === 'date');
  return stringCol?.key ?? columns[0]?.key ?? 'label';
}

/**
 * All non-label columns that look numeric become value series.
 */
function inferValueKeys(columns, labelKey) {
  return columns
    .filter((c) => c.key !== labelKey && (c.type === 'number' || c.type === 'integer'))
    .map((c) => c.key);
}

/**
 * Infer the best chart type from column shape and row count.
 */
function inferChartType(columns, rows) {
  const numericCols = columns.filter(
    (c) => c.type === 'number' || c.type === 'integer'
  );

  if (numericCols.length === 1 && rows.length <= 10) return 'pie';
  if (numericCols.length >= 1 && rows.length > 0) return 'bar';
  return 'table';
}

/**
 * Safely parse a value as a number.
 * Returns null for non-numeric strings.
 */
function parseNumeric(value) {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(String(value).replace(',', '.'));
  return isNaN(n) ? null : n;
}
