import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function rateLimit(
  request: Request,
  limit: number = 10,
  window: number = 60
) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const key = `rate_limit:${ip}`;
  
  const current = await redis.incr(key);
  if (current > limit) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }
  
  if (current === 1) {
    await redis.expire(key, window);
  }
  
  return null;
}