import { getDataset } from '@/lib/services/datasetService.js';
import { ok, notFound, withErrorHandler } from '@/lib/api/response.js';

/**
 * GET /api/datasets/[category]/[dataset]
 *
 * Returns the full normalized dataset including all columns and rows.
 *
 * Supports optional query params:
 *   ?page=1&pageSize=100    Paginate rows (default: all rows)
 *
 * Response:
 * {
 *   success: true,
 *   data: {
 *     id, slug, title, category, subcategory, description,
 *     columns: [{ key, label, type }],
 *     rows: [...],
 *     meta: { rowCount, columnCount, source, updatedAt, tags },
 *     pagination: { page, pageSize, total, totalPages }  // if paginated
 *   }
 * }
 */
export const GET = withErrorHandler(async (request, { params }) => {
  const { category, dataset: slug } = await params;

  const normalized = await getDataset(category, slug);
  if (!normalized) return notFound(`Dataset "${slug}" not found in category "${category}"`);

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') ?? '0', 10);

  // If pageSize is 0 or not provided, return all rows unpaginated
  if (!pageSize || pageSize <= 0) {
    return ok(normalized);
  }

  // Paginate rows
  const total = normalized.rows.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedRows = normalized.rows.slice(start, start + pageSize);

  return ok({
    ...normalized,
    rows: paginatedRows,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
    },
  });
});
