import '@/config/env';
import express from '@/config/express';
import logger from '@/config/winston';
import { mainJob } from '@/app/scheduler';
import { redisClient } from '@/app/redis'
// import { AppDataSource } from '@/config/datasource';

const port = process.env.PORT || 8080;
express().listen(port);
logger.info(`environment : ${process.env.NODE_ENV} - Mail Server Start At Port ${port}`);
// Redis 연결
redisClient.connect().then();

//schedule 예약  - node 재실행 시 재예약
mainJob();



// AppDataSource.initialize()
//     .then(() => {
//         logger.info('DB Connected');
//         express().listen(port);
//         logger.info(`environment : ${process.env.NODE_ENV} - API Server Start At Port ${port}`);
//     })
//     .catch((error) => {
//         logger.error(error.toString());
//     });