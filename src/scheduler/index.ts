import logger from '@/config/winston';
import schedule from 'node-schedule'

logger.info(`Scheduler has been registered`);

export function testJob() {
    let secondRule = new schedule.RecurrenceRule();
    secondRule.second = 10;
    const every1minJob = schedule.scheduleJob(secondRule, function () {
        logger.info('매 10초마다 실행됩니다.(1분 간격)');
    })

    let minuteRule = new schedule.RecurrenceRule();
    minuteRule.minute = 7;
    const specificTimeJob = schedule.scheduleJob(minuteRule, function () {
        logger.info('시간이 되었습니다. 실행합니다.');
    })
}