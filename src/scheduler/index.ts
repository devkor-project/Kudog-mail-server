import logger from '@/config/winston';
import schedule from 'node-schedule'
import { redisCli } from "@/redis";
import { bulkSend } from '@/bulkSending';
import { bulkSendDto } from '@/interface/mailDto';
import { redisFactory } from '@/utils/Redisfactory';

logger.info(`Scheduler has been registered`);

export function mainJob() {
    try {
        //-----test를 위해 임시 처리
        let minuteRule = new schedule.RecurrenceRule();
        minuteRule.minute = 15; // 배포시 구체적인 시간 설정
        //-----test를 위해 임시 처리

        const specificTimeJob = schedule.scheduleJob(minuteRule, async function () {
            logger.info('시간이 되었습니다. 실행합니다.');

            //-----test를 위해 임시 처리
            // 1. <To do> 오늘 생성된 공지사항들의 카테고리 추출
            const categoryList = ['A'] // *임시 선언*
            //-----test를 위해 임시 처리

            // 2. 각 카테고리 마다 오늘 생성된 모든 공지사항을 담아서 html 생성 후 caching
            redisFactory(categoryList).then(() => {
                logger.info('redis setting is done');
            })

            // ##To Do## 3. arrangement Agent 호출 (여기서 bulkSending 호출)

            //-----test를 위해 임시 처리
            const categorySet = ['A']
            const userEmailList = ['cksgh1735@naver.com', 'cksgh1735@gmail.com']

            const data: bulkSendDto = { categorySet, userEmailList }

            await bulkSend(data).then(() => {
                logger.info(`mainJob Scheduler is successfully done`);
            })
            //-----test를 위해 임시 처리

        })

    } catch (error) {
        logger.error(`mainJob Scheduler failed, message :`, { message: error });
    }
}