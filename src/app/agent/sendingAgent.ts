import logger from '@/config/winston';
import { bulkSendDto } from '@/interface/mailDto';
import { bulkSend } from '../bulkSending';
import { userPerCategorySet } from '../../utils/dao';
import { parseToArray, filter } from './transform';
import { sendingRequest } from './request';

export async function sendingAgent(categoryList: string[]) {
    try {
        let subscribeList: any = await userPerCategorySet();
        subscribeList = parseToArray(filter(subscribeList, categoryList));

        await sendingRequest(subscribeList);
    } catch (error) {
        logger.error('sendingAgent Error, message :', { message: error.toString() });
    }
}