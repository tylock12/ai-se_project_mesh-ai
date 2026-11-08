type CacheEntry = { value: unknown; expiresAt: number };
const store = new Map<string, CacheEntry>();

export const setCacheValue = (key: string, value: unknown, ttlMs: number) => {
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
};

export const getCacheValue = (key: string): unknown => {
  const entry = store.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return undefined;
  }
  return entry.value;
};

export const deleteCacheValue = (key: string) => {
  store.delete(key);
};