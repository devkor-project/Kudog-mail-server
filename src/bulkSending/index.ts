import { bulkSendDto } from "@/interface/mailDto";
import { redisCli } from '@/redis';
import { EmailParams, Sender, Recipient } from 'mailer-send-ts';
import mailerSend from '@/utils/mailerSend';
import logger from "@/config/winston";

export async function bulkSend(data: bulkSendDto) {
    try {
        const { categorySet, userEmailList } = data;

        let mainHTML = ''
        for (let category of categorySet) {
            // get from Redis
            const subHTML = await redisCli.get(category);
            mainHTML += subHTML;
        }

        // recipient 담아둘 배열
        const bulkEmails: EmailParams[] = [];

        // 발신자 정보
        const sentFrom = new Sender('kudogEmail@kudog.email', 'kudog');

        for (let email of userEmailList) {
            logger.info(`${email} is added`)

            const recipient = [new Recipient(email)];

            const variable = [
                {
                    email: email,
                    substitutions: [
                        {
                            var: 'html',
                            value: mainHTML
                        }
                    ],
                },
            ];

            const emailParams = new EmailParams()
                .setFrom(sentFrom)
                .setTo(recipient)
                .setSubject('[Kudog] 오늘의 공지사항')
                .setVariables(variable)
                .setTemplateId('o65qngkdw53lwr12');

            bulkEmails.push(emailParams);
        }

        await mailerSend.email.sendBulk(bulkEmails).then(() => {
            logger.info('bulkSend : successful');
        })

    } catch (error) {
        logger.error(`Error! bulksend, message :`, { message: error });
    }
}