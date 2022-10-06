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
        //-----test를 위해 임시 처리
        let minuteRule = new schedule.RecurrenceRule();
        minuteRule.minute = 37; // 배포시 구체적인 시간 설정
        //-----test를 위해 임시 처리

        const specificTimeJob = schedule.scheduleJob(minuteRule, async function () {
            logger.info('시간이 되었습니다. 실행합니다.');

            //-----test를 위해 임시 처리
            // 1. <To do> 오늘 생성된 공지사항들의 카테고리 추출
            const categoryList: string[] = ['testA', 'testB', 'testC'] // *임시 선언*
            //-----test를 위해 임시 처리

            // 2. 각 카테고리 마다 오늘 생성된 모든 공지사항을 담아서 html 생성 후 caching
            await redisFactory(categoryList).then(() => {
                logger.info('redis setting is done');
            })

            // 3. sending Agent 호출
            await sendingAgent(categoryList);
        })

    } catch (error) {
        logger.error(`mainJob Scheduler failed, message :`, { message: error });
    } finally {
        // to do: redis memory refresh
    }
}