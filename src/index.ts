import '@/config/env';
import express from '@/config/express';
import logger from '@/config/winston';
import { testJob } from '@/scheduler';

const port = process.env.PORT || 8080;
express().listen(port);
logger.info(`environment : ${process.env.NODE_ENV} - API Server Start At Port ${port}`);

//schedule 예약  - node 재실행 시 재예약
testJob();
