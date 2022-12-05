import logger from '@/config/winston';
import schedule from 'node-schedule'
import { concatCategory } from '../agent/transform';
import { redisFactory } from '@/app/redis/redisfactory';
import { sendingAgent } from '@/app/agent/sendingAgent';
import { getCategoryOnToday } from '@/utils/dao';

logger.info(`Scheduler has been registered`);

export async function mainJob() {
    try {
        logger.info('🎉 Start Schedule Job! 🎉');

        const categoryList: Array<[string, string]> = await getCategoryOnToday();

        await redisFactory(categoryList).then(() => {
            logger.info('📦 Redis Caching is Done 📦');
        })

        await sendingAgent(concatCategory(categoryList)).then(() => {
            logger.info('🎉 Schedule Job is successfully done! 🎉')
        })

    } catch (error) {
        logger.error(`mainJob Scheduler failed, message :`, { message: error.toString() });
    } finally {
        // to do: redis memory refresh
    }
}