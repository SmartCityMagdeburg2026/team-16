import { unstable_cache } from 'next/cache';
import * as memoryCache from './memoryCache.js';
 
const TTL = {
  CATEGORIES: 5 * 60 * 1000,       // 5 min — rarely changes
  DATASET_LIST: 2 * 60 * 1000,      // 2 min
  DATASET: 60 * 1000,               // 1 min
  SEARCH_INDEX: 10 * 60 * 1000,     // 10 min — expensive to build
};

/**
 * Wrap an async function with memory caching.
 * Falls back to calling fn() on cache miss.
 *
 * @param {string} key       - Cache key
 * @param {Function} fn      - Async function to call on cache miss
 * @param {number} ttlMs     - TTL in milliseconds
 */
export async function withCache(key, fn, ttlMs = TTL.DATASET) {
  const cached = memoryCache.get(key);
  if (cached !== undefined) return cached;

  const value = await fn();
  memoryCache.set(key, value, ttlMs);
  return value;
}

/**
 * Cache key builders — centralised so key format never drifts.
 */
export const keys = {
  categories: () => 'categories:all',
  categoryMeta: (category) => `category:${category}:meta`,
  datasetList: (category) => `category:${category}:datasets`,
  dataset: (category, slug) => `dataset:${category}:${slug}`,
  searchIndex: () => 'search:index',
};

export { TTL };

/**
 * Next.js Data Cache integration via unstable_cache.
 * Use these wrappers in Server Components or Route Handlers
 * when you want persistent cross-request caching tied to
 * Next.js revalidation tags.
 *
 * Example:
 *   const data = await cachedFetch(() => loadDataset(...), ['datasets'], 'dataset-tag')
 */
export function makeCachedFetcher(fn, keyParts, tags, revalidate = 60) {
  return unstable_cache(fn, keyParts, { tags, revalidate });
}
