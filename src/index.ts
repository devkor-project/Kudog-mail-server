import '@/config/env';
import express from '@/config/express';
import logger from '@/config/winston';
import { testJob } from '@/scheduler';
import * as redis from 'redis';

const port = process.env.PORT || 8080;
express().listen(port);
logger.info(`environment : ${process.env.NODE_ENV} - API Server Start At Port ${port}`);

//schedule 예약  - node 재실행 시 재예약
testJob();

// Redis 연결
export const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
    legacyMode: true,
});
redisClient.on('connect', () => {
    logger.info('Redis connected!');
});
redisClient.on('error', (err) => {
    logger.error('Redis Client Error', err);
});
redisClient.connect().then(); // redis v4 연결 (비동기)
const redisCli = redisClient.v4; // 기본 redisClient 객체는 콜백기반인데 v4버젼은 프로미스 기반이라 사용