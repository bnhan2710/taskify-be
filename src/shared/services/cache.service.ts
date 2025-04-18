import instance from '../../core/configs/redis.config';
import { env } from '../../core/configs/env.config';
class CacheService {
  private static DEFAULT_EXPIRATION_TIME = parseInt(env.CACHE_EXPIRE) || 2592000;

  async set<T>(
    key: string,
    value: T,
    expTime: number = CacheService.DEFAULT_EXPIRATION_TIME,
  ): Promise<void> {
    await instance.set(key, JSON.stringify(value), { EX: expTime });
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await instance.get(key);
    return data ? (JSON.parse(data) as T) : null;
  }

  async del(key: string): Promise<void> {
    await instance.del(key);
  }
}

export default new CacheService();
