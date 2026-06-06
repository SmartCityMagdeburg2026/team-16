import { revalidateTag } from 'next/cache';
import * as memoryCache from '@/lib/cache/memoryCache.js';
import { ok, badRequest, error, withErrorHandler } from '@/lib/api/response.js';

/**
 * POST /api/revalidate
 *
 * Clears in-memory cache and triggers Next.js Data Cache revalidation.
 * Call this endpoint after your data files are updated (e.g. from a CI pipeline).
 *
 * Body (JSON):
 * {
 *   "secret": "your-revalidation-secret",   // must match REVALIDATE_SECRET env var
 *   "scope": "all" | "category" | "search",
 *   "category": "arbeitsmarkt"              // required if scope = "category"
 * }
 *
 * Response:
 * { success: true, data: { revalidated: true, scope: "all" } }
 */
export const POST = withErrorHandler(async (request) => {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return error('REVALIDATE_SECRET env var not configured', 500);

  let body;
  try {
    body = await request.json();
  } catch {
    return badRequest('Invalid JSON body');
  }

  if (body.secret !== secret) {
    return error('Unauthorized', 401);
  }

  const scope = body.scope ?? 'all';

  if (scope === 'category') {
    if (!body.category) return badRequest('"category" is required when scope is "category"');
    memoryCache.invalidatePrefix(`category:${body.category}`);
    memoryCache.invalidatePrefix(`dataset:${body.category}`);
    memoryCache.del('categories:all');
    revalidateTag('categories');
    return ok({ revalidated: true, scope, category: body.category });
  }

  if (scope === 'search') {
    memoryCache.del('search:index');
    return ok({ revalidated: true, scope });
  }

  // scope === 'all'
  memoryCache.clear();
  revalidateTag('categories');
  revalidateTag('datasets');
  return ok({ revalidated: true, scope: 'all' });
});
