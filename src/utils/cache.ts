import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: +(process.env.REDIS_PORT || 6379),
});

export const getCache = (key: string): Promise<string | null> => redis.get(key);

export const setCache = (
  key: string,
  value: string,
  ttl: number
): Promise<'OK'> => redis.set(key, value, 'EX', ttl);
