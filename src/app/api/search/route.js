import { search } from '@/lib/search/searchService.js';
import { ok, badRequest, withErrorHandler } from '@/lib/api/response.js';

/**
 * GET /api/search
 *
 * Full-text search across all dataset metadata (title, description, tags, columns).
 * Row data is never searched — only structural metadata.
 *
 * Query params:
 *   ?q=arbeitslose          Search query (required, min 1 char)
 *   ?category=arbeitsmarkt  Limit to a specific category (optional)
 *   ?limit=20               Max results per page (default 20, max 100)
 *   ?offset=0               Pagination offset (default 0)
 *
 * Response:
 * {
 *   success: true,
 *   data: {
 *     query: "arbeitslose",
 *     total: 3,
 *     limit: 20,
 *     offset: 0,
 *     results: [ { id, slug, title, category, description, meta }, ... ]
 *   }
 * }
 */
export const GET = withErrorHandler(async (request) => {
  const { searchParams } = new URL(request.url);

  const q = (searchParams.get('q') ?? '').trim();
  if (!q) return badRequest('Query parameter "q" is required');

  const category = searchParams.get('category') ?? null;
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '20', 10), 100);
  const offset = Math.max(parseInt(searchParams.get('offset') ?? '0', 10), 0);

  const results = await search({ q, category, limit, offset });
  return ok(results);
});
