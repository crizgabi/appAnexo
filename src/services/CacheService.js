import redisClient from "../db/RedisClient.js";

const CACHE_PREFIX = "cache:";

export const CacheService = {
  async get(key) {
    const value = await redisClient.get(CACHE_PREFIX + key);
    return value ? JSON.parse(value) : null;
  },

  async set(key, value, ttlSeconds = 60) {
    await redisClient.set(
      CACHE_PREFIX + key,
      JSON.stringify(value),
      { EX: ttlSeconds }
    );
  },

  async del(key) {
    await redisClient.del(CACHE_PREFIX + key);
  },

  async delByPattern(pattern) {
    const keys = await redisClient.keys(CACHE_PREFIX + pattern);
    if (keys.length) {
      await redisClient.del(keys);
    }
  }
};