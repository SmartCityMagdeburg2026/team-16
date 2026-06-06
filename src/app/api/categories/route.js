import { getCategories } from '@/lib/services/datasetService.js';
import { ok, withErrorHandler } from '@/lib/api/response.js';

/**
 * GET /api/categories
 *
 * Returns all top-level data categories with dataset counts.
 *
 * Response:
 * {
 *   success: true,
 *   data: [
 *     { slug: "arbeitsmarkt", label: "Arbeitsmarkt", datasetCount: 12 },
 *     ...
 *   ]
 * }
 */
export const GET = withErrorHandler(async () => {
  const categories = await getCategories();
  return ok(categories);
});
