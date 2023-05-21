import { NextFunction, Request, Response } from "express";

import RedisBootstrap from "../../bootstrap/Redis.bootstrap";
import logger from "../../helpers/Logger";

export class CacheMiddleware {
  private static setParameters(key: string, params: Record<string, any>) {
    if (params) {
      Object.keys(params).forEach((paramKey) => {
        key = key.replace(`:${paramKey}`, params[paramKey]);
      });
    }
    return key;
  }

  static build(prefix: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let cacheKey = prefix;
      cacheKey = this.setParameters(cacheKey, req.params);
      cacheKey = this.setParameters(cacheKey, req.query);
      cacheKey = this.setParameters(cacheKey, req.body);

      const client = RedisBootstrap.connection;
      const value = await client.get(cacheKey);

      if (value) {
        logger.info(`Cache hit: ${cacheKey}`);
        return res.send(JSON.parse(value));
      } else {
        logger.info(`Cache miss: ${cacheKey}`);
        res.locals.cacheKey = cacheKey;
        next();
      }
    };
  }
}
