import { Parameters } from '@core/parameters';
import IORedis from 'ioredis';

import { IBootstrap, TInitialize } from './bootstrap.interface';

export class RedisBootstrap implements IBootstrap {
  private static client: IORedis;

  async initialize(): Promise<TInitialize> {
    return new Promise((resolve, reject) => {
      const dbRedisConfig = Parameters.dbRedisConfig;

      const client = new IORedis({ ...dbRedisConfig });

      client
        .on("connect", () => {
          RedisBootstrap.client = client;
          console.log("Redis connected");
          resolve(true);
        })
        .on("error", (error) => {
          console.error("Redis error", error);
          reject(error);
        });
    });
  }

  close() {
    RedisBootstrap.client?.disconnect();
  }

  static get redisClient() {
    return RedisBootstrap.client;
  }

  static async set(key: string, value: string): Promise<void> {
    await RedisBootstrap.client.set(key, value, "PX", 1000 * 60 * 60 * 24);
  }

  static async get(key: string): Promise<string | null> {
    return await RedisBootstrap.client.get(key);
  }

  static async reset(prefix: string = "") {
    const keys = await RedisBootstrap.client.keys(`${prefix}*`);
    if (keys.length > 0) {
      await RedisBootstrap.client.del(...keys);
    }
  }
}
