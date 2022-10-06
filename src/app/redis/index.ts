import * as redis from 'redis';
import logger from '@/config/winston';

// Redis 연결
export const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
    legacyMode: true,
});

// event listener
redisClient.on('connect', () => {
    logger.info('Redis is connected!');
});

redisClient.on('error', (error) => {
    logger.error('Redis Client Error', { message: error.toString() });
});

export const redisCli = redisClient.v4;