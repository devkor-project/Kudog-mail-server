import logger from "@/config/winston";
import { bulkSendDto } from "@/interface/mailDto";
import { bulkSend } from "../bulkSending";


export async function sendingRequest(subscribeList) {
    try {
        for (let i = 0; i < subscribeList.length; i++) {
            const { categorySet, emailList } = subscribeList[i];
            const data: bulkSendDto = { categorySet, emailList }

            await bulkSend(data).then(() => logger.info(`categorySet : ${categorySet} | Sending is done`));
        }
    } catch (error) {
        logger.error('sendingRequest Error, message :', { message: error.toString() });
    }
}