import { getDataset } from '@/lib/services/datasetService.js';
import { transformForChart } from '@/lib/transformers/chartTransformer.js';
import { ok, notFound, badRequest, withErrorHandler } from '@/lib/api/response.js';

const VALID_TYPES = ['bar', 'line', 'pie', 'table'];

/**
 * GET /api/datasets/[category]/[dataset]/chart
 *
 * Returns the dataset transformed into a chart-ready payload.
 * The frontend uses this response to render charts directly.
 *
 * Query params:
 *   ?type=bar            Chart type: bar | line | pie | table
 *   ?labelKey=year       Column key to use as X-axis labels
 *   ?valueKey=count      Single value series column key
 *   ?valueKeys=a,b,c     Multiple value series (comma-separated)
 *
 * If no params are provided, type and keys are inferred from the data shape.
 *
 * Response:
 * {
 *   success: true,
 *   data: {
 *     type: "bar",
 *     datasetId: "...",
 *     datasetTitle: "...",
 *     labelKey: "year",
 *     valueKeys: ["count"],
 *     labels: ["2019", "2020", ...],
 *     series: [{ key: "count", label: "count", data: [100, 200, ...] }]
 *   }
 * }
 */
export const GET = withErrorHandler(async (request, { params }) => {
  const { category, dataset: slug } = await params;

  const normalized = await getDataset(category, slug);
  if (!normalized) return notFound(`Dataset "${slug}" not found in category "${category}"`);

  const { searchParams } = new URL(request.url);

  const type = searchParams.get('type') ?? undefined;
  if (type && !VALID_TYPES.includes(type)) {
    return badRequest(
      `Invalid chart type "${type}". Valid types: ${VALID_TYPES.join(', ')}`
    );
  }

  const labelKey = searchParams.get('labelKey') ?? undefined;
  const valueKey = searchParams.get('valueKey') ?? undefined;
  const valueKeysParam = searchParams.get('valueKeys');
  const valueKeys = valueKeysParam
    ? valueKeysParam.split(',').map((k) => k.trim()).filter(Boolean)
    : undefined;

  const chartData = transformForChart(normalized, { type, labelKey, valueKey, valueKeys });

  return ok(chartData);
});
