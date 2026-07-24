import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis, RateLimiterRes } from "rate-limiter-flexible";
import { createClient } from "redis";


const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD || undefined,
});

redisClient.connect().catch(console.error);

const limiter = new RateLimiterRedis ({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
});


export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip as string);
    return next();
  } catch (err) {
    if (err instanceof RateLimiterRes) {
      throw new AppError('Too many requests', 429);
    }
    // Redis unavailable — fail open to avoid blocking all requests
    return next();
  }

}

