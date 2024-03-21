import { NextFunction, Request, Response } from "express";

import { RedisBootstrap } from "../../../bootstrap/redis.bootstrap";

export class CacheMiddleware {
  private static getParameters(params: Record<string, any>) {
    let parameters = "";

    Object.keys(params).forEach((key) => {
      parameters += `-${key}-${params[key]}`;
    });

    return parameters;
  }

  static build(prefix: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let cacheKey = prefix;

      if (req.query) {
        cacheKey += this.getParameters(req.query);
      }

      if (req.body) {
        cacheKey += this.getParameters(req.body);
      }

      if (req.params) {
        cacheKey += this.getParameters(req.params);
      }

      const client = RedisBootstrap.redisClient;
      const valueInCache = await client.get(cacheKey);

      if (valueInCache) {
        console.log("Response from cache");
        return res.status(200).json(JSON.parse(valueInCache));
      }

      res.locals.cacheKey = cacheKey;
      next();
    };
  }
}
