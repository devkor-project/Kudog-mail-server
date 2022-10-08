import logger from '@/config/winston';
import schedule from 'node-schedule'
import { redisCli } from "@/app/redis";
import { bulkSend } from '@/app/bulkSending';
import { bulkSendDto } from '@/interface/mailDto';
import { redisFactory } from '@/app/redis/redisfactory';
import { sendingAgent } from '@/app/agent/sendingAgent';

logger.info(`Scheduler has been registered`);

export function mainJob() {
    try {
        let minuteRule = new schedule.RecurrenceRule();
        minuteRule.minute = 7; // 배포시 구체적인 시간 설정

        const specificTimeJob = schedule.scheduleJob(minuteRule, async function () {
            logger.info('시간이 되었습니다. 실행합니다.');

            //-----test를 위해 임시 처리
            // 1. <To do> "오늘 생성된 공지사항"들의 카테고리 추출
            const categoryList: string[] = ['testA', 'testB', 'testC'] // *임시 선언*

            await redisFactory(categoryList).then(() => {
                logger.info('redis setting is done');
            })

            await sendingAgent(categoryList);
        }).then(() => { logger.info('scheduler 작업이 성공적으로 완료되었습니다.') });

    } catch (error) {
        logger.error(`mainJob Scheduler failed, message :`, { message: error.toString() });
    } finally {
        // to do: redis memory refresh
    }
}