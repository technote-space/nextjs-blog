import NodeCache from 'node-cache';

const cache = new NodeCache();

export type Key = string;
export const get = <T>(key: Key): T | undefined => {
  return cache.get<T>(key);
};

export const set = <T>(key: Key, value: T, ttlSec?: number): boolean => {
  if (ttlSec) {
    return cache.set(key, value, ttlSec);
  }

  return cache.set(key, value);
};

export const has = (key: Key): boolean => {
  return cache.has(key);
};

export const del = (key: Key): void => {
  cache.del(key);
};

export const getOrGenerate = async <T>(key: Key, generate: (key: Key) => Promise<T>, ttlSec?: number): Promise<T> => {
  const cached = get<T>(key);
  if (cached !== undefined) {
    return cached;
  }

  const generated = await generate(key);
  set(key, generated, ttlSec);

  return generated;
};
