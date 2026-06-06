/**
 * Simple in-memory TTL cache.
 * In production, swap this out for Redis or a persistent store.
 *
 * Next.js 15 App Router also supports fetch() caching and
 * unstable_cache from 'next/cache' — see cacheService.js for
 * integration with those APIs.
 */

const store = new Map();

const DEFAULT_TTL_MS = 60 * 1000; // 60 seconds

/**
 * Read a value from cache.
 * Returns undefined if missing or expired.
 */
export function get(key) {
  const entry = store.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return undefined;
  }
  return entry.value;
}

/**
 * Write a value to cache with an optional TTL in milliseconds.
 */
export function set(key, value, ttlMs = DEFAULT_TTL_MS) {
  store.set(key, {
    value,
    expiresAt: Date.now() + ttlMs,
  });
}

/**
 * Delete a specific key.
 */
export function del(key) {
  store.delete(key);
}

/**
 * Invalidate all keys that start with a given prefix.
 * Useful for busting an entire category at once.
 */
export function invalidatePrefix(prefix) {
  for (const key of store.keys()) {
    if (key.startsWith(prefix)) store.delete(key);
  }
}

/**
 * Clear the entire cache.
 */
export function clear() {
  store.clear();
}

/**
 * Return cache stats for debugging/monitoring.
 */
export function stats() {
  const now = Date.now();
  let active = 0;
  let expired = 0;
  for (const entry of store.values()) {
    if (now > entry.expiresAt) expired++;
    else active++;
  }
  return { total: store.size, active, expired };
}
