/**
 * Barrel export — import anything from '@/lib' instead of deep paths.
 *
 * Usage:
 *   import { getDataset, search } from '@/lib';
 */

// Services
export { getCategories, getCategoryMeta, getDatasetsInCategory, getDataset } from './services/datasetService.js';

// Search
export { search } from './search/searchService.js';

// Transformers
export { transformForChart } from './transformers/chartTransformer.js';

// Normalizer utilities
export { normalizeDataset, toMetaSummary } from './services/normalizer.js';

// Cache utilities (for admin/revalidation endpoints)
export { withCache, keys, TTL } from './cache/cacheService.js';
export * as memoryCache from './cache/memoryCache.js';

// Response helpers
export { ok, error, notFound, badRequest, withErrorHandler } from './api/response.js';

// Low-level loader (only needed for advanced use)
export {
  listCategories,
  listDatasetFiles,
  loadDataset,
  loadAllDatasetsInCategory,
  resolveDatasetFilename,
  fileToSlug,
} from './loader/dataLoader.js';
