import { getCategoryMeta } from '@/lib/services/datasetService.js';
import { ok, notFound, withErrorHandler } from '@/lib/api/response.js';

/**
 * GET /api/categories/[category]
 *
 * Returns metadata for a single category including all dataset summaries.
 * Row data is NOT included — use /api/datasets/[category]/[dataset] for that.
 *
 * Response:
 * {
 *   success: true,
 *   data: {
 *     slug: "arbeitsmarkt",
 *     label: "Arbeitsmarkt",
 *     datasetCount: 12,
 *     subcategories: ["Grundsicherung", ...],
 *     datasets: [ { id, slug, title, meta: { rowCount, columnCount, ... } }, ... ]
 *   }
 * }
 */
export const GET = withErrorHandler(async (_request, { params }) => {
  const { category } = await params;

  const meta = await getCategoryMeta(category);
  if (!meta) return notFound(`Category "${category}" not found`);

  return ok(meta);
});
