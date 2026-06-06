import {
  listCategories,
  listDatasetFiles,
  loadDataset,
  loadAllDatasetsInCategory,
  resolveDatasetFilename,
  fileToSlug,
} from '@/lib/loader/dataLoader.js';
import { normalizeDataset, toMetaSummary } from './normalizer.js';
import { withCache, keys, TTL } from '@/lib/cache/cacheService.js';

/**
 * Return a list of all category names with summary counts.
 */
export async function getCategories() {
  return withCache(keys.categories(), async () => {
    const categories = await listCategories();

    const summaries = await Promise.all(
      categories.map(async (category) => {
        const files = await listDatasetFiles(category).catch(() => []);
        return {
          slug: category,
          label: formatLabel(category),
          datasetCount: files.length,
        };
      })
    );

    return summaries;
  }, TTL.CATEGORIES);
}

/**
 * Return all dataset metadata summaries for a given category.
 * Does NOT include row data.
 */
export async function getDatasetsInCategory(category) {
  return withCache(keys.datasetList(category), async () => {
    const entries = await loadAllDatasetsInCategory(category);

    return entries.map(({ file, data }) => {
      const normalized = normalizeDataset(data, category, file);
      return toMetaSummary(normalized);
    });
  }, TTL.DATASET_LIST);
}

/**
 * Return a single fully normalized dataset including all rows.
 *
 * @param {string} category - Category directory name
 * @param {string} slug     - Dataset slug (filename without .json)
 */
export async function getDataset(category, slug) {
  return withCache(keys.dataset(category, slug), async () => {
    const filename = await resolveDatasetFilename(category, slug);
    if (!filename) return null;

    const raw = await loadDataset(category, filename);
    if (!raw) return null;

    return normalizeDataset(raw, category, filename);
  }, TTL.DATASET);
}

/**
 * Return category-level metadata: label, dataset count, subcategories.
 */
export async function getCategoryMeta(category) {
  return withCache(keys.categoryMeta(category), async () => {
    const datasets = await getDatasetsInCategory(category);
    if (!datasets) return null;

    const subcategories = [
      ...new Set(datasets.map((d) => d.subcategory).filter(Boolean)),
    ];

    return {
      slug: category,
      label: formatLabel(category),
      datasetCount: datasets.length,
      subcategories,
      datasets,
    };
  }, TTL.CATEGORIES);
}

/**
 * Format a directory slug into a human-readable label.
 * e.g. "bildung-und-kultur" → "Bildung und Kultur"
 */
function formatLabel(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
