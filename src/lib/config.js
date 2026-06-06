/**
 * Centralised config — read env vars once here, never scattered across files.
 */

export const config = {
  /** Absolute path to the data directory */
  dataRoot: process.env.DATA_ROOT ?? 'data/kiss-md/json',

  /** Revalidation secret for the /api/revalidate endpoint */
  revalidateSecret: process.env.REVALIDATE_SECRET ?? '',

  cache: {
    /** Default in-memory TTL values in milliseconds */
    ttl: {
      categories: parseInt(process.env.CACHE_TTL_CATEGORIES ?? '300000', 10),  // 5 min
      datasetList: parseInt(process.env.CACHE_TTL_DATASET_LIST ?? '120000', 10), // 2 min
      dataset: parseInt(process.env.CACHE_TTL_DATASET ?? '60000', 10),           // 1 min
      searchIndex: parseInt(process.env.CACHE_TTL_SEARCH ?? '600000', 10),       // 10 min
    },
  },

  search: {
    defaultLimit: 20,
    maxLimit: 100,
  },

  pagination: {
    defaultPageSize: 100,
  },
};
