import {
  listCategories,
  loadAllDatasetsInCategory,
} from '@/lib/loader/dataLoader.js';
import { normalizeDataset, toMetaSummary } from '@/lib/services/normalizer.js';
import { withCache, keys, TTL } from '@/lib/cache/cacheService.js';

async function buildSearchIndex() {
  const categories = await listCategories();

  const allEntries = await Promise.all(
    categories.map(async (category) => {
      const loaded = await loadAllDatasetsInCategory(category);
      return loaded.map(({ file, data }) => {
        const normalized = normalizeDataset(data, category, file);
        const summary = toMetaSummary(normalized);
        return {
          ...summary,
          _searchText: buildSearchCorpus(summary),
        };
      });
    })
  );

  return allEntries.flat();
}

function buildSearchCorpus(summary) {
  return [
    summary.title,
    summary.description,
    summary.category,
    summary.subcategory,
    ...(summary.meta?.tags ?? []),
    ...(summary.meta?.columnKeys ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export async function search({ q = '', category = null, limit = 20, offset = 0 }) {
  const index = await withCache(
    keys.searchIndex(),
    buildSearchIndex,
    TTL.SEARCH_INDEX
  );

  const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);

  let results = index;

  if (category) {
    results = results.filter((entry) => entry.category === category);
  }

  if (terms.length > 0) {
    results = results.filter((entry) =>
      terms.every((term) => entry._searchText.includes(term))
    );
  }

  const queryLower = q.toLowerCase();
  results = results.sort((a, b) => {
    const aTitle = (a.title ?? '').toLowerCase();
    const bTitle = (b.title ?? '').toLowerCase();
    const aStarts = aTitle.startsWith(queryLower) ? 0 : 1;
    const bStarts = bTitle.startsWith(queryLower) ? 0 : 1;
    return aStarts - bStarts || aTitle.localeCompare(bTitle);
  });

  const total = results.length;
  const paginated = results
    .slice(offset, offset + limit)
    .map(({ _searchText, ...entry }) => entry);

  return { query: q, total, limit, offset, results: paginated };
}
