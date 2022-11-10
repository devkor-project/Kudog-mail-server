import logger from '@/config/winston';
import schedule from 'node-schedule'
import { parseToStringArray } from '@/app/agent/transform';
import { redisFactory } from '@/app/redis/redisfactory';
import { sendingAgent } from '@/app/agent/sendingAgent';
import { getCategoryOnToday } from '@/utils/dao';

logger.info(`Scheduler has been registered`);

export async function mainJob() {
    try {
        let minuteRule = new schedule.RecurrenceRule();
        minuteRule.minute = 8; // 배포시 구체적인 시간 설정

        const specificTimeJob = schedule.scheduleJob(minuteRule, async function () {
            logger.info('🎉 Start Schedule Job! 🎉');

            const categoryList: string[] = await getCategoryOnToday();
            const categoryStringArray = parseToStringArray(categoryList);

            await redisFactory(categoryStringArray).then(() => {
                logger.info('📦 Redis Caching is Done 📦');
            })

            await sendingAgent(categoryStringArray).then(() => {
                logger.info('🎉 Schedule Job is successfully done! 🎉')
            })
        });

    } catch (error) {
        logger.error(`mainJob Scheduler failed, message :`, { message: error.toString() });
    } finally {
        // to do: redis memory refresh
    }
}