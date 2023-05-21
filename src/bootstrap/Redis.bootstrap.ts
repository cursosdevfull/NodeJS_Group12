import IORedis from "ioredis";
import { DataSource } from "typeorm";

import logger from "../helpers/Logger";
import { IRedisConfig, Parameters } from "../helpers/Parameters";
import { Bootstrap } from "./bootstrap.interface";

export default class RedisBootstrap implements Bootstrap {
  private static client: IORedis;

  initialize(): Promise<boolean | DataSource> {
    return new Promise((resolve, reject) => {
      const redisConfig: IRedisConfig = Parameters.REDIS_CONFIG;
      const client = new IORedis(redisConfig);

      client
        .on("connect", () => {
          logger.info(
            `Redis connected at ${redisConfig.host}:${redisConfig.port}`
          );
          resolve(true);
        })
        .on("error", (err) => {
          logger.error(`Redis connection error: ${err}`);
          reject(err);
        });

      RedisBootstrap.client = client;
    });
  }

  close(): void {
    RedisBootstrap.client?.disconnect();
  }

  static get connection(): IORedis {
    return this.client;
  }

  static async get(key: string) {
    return this.client.get(key);
  }

  static async set(key: string, value: string) {
    await this.client.set(key, value, "PX", 24 * 60 * 60 * 1000);
  }

  static async clear(prefix: string = "") {
    const keys = await this.client.keys(`${prefix}*`);
    if (keys.length > 0) {
      await this.client.del(keys);
    }
  }
}
