import { redisCli } from '@/app/redis';
import { EmailParams, Sender, Recipient } from 'mailer-send-ts';
import mailerSend from '@/utils/mailerSend';
import logger from "@/config/winston";

export async function sendCode(email: string, code: string) {
  try {
    const mainHTML = `<!DOCTYPE html>
<html>

<head>
  <title>auth code for kudog service</title>
</head>

<body>
  <h3>${12344}</h3>
</body>

</html>`;

    // 발신자 정보
    const sentFrom = new Sender('kudogEmail@kudog.email', 'kudog');


    logger.info(`${code} is sent to ${email}`)

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
    const paramsArray = [];
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipient)
      .setSubject('[Kudog] 이메일 인증 코드입니다.')
      .setVariables(variable)
      .setTemplateId('o65qngkdw53lwr12');
    paramsArray.push(emailParams);
    await mailerSend.email.sendBulk(paramsArray).then((e) => {
      logger.info(e);
      console.info(e)
      logger.info('auth code send successfully');
    })

  } catch (error) {
    logger.error(`Error! auth code send, message :`, { message: error.toString() });
  }
}