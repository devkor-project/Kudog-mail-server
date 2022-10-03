/* eslint-disable import/prefer-default-export */
import { EmailParams, Sender, Recipient } from 'mailer-send-ts';
import mailerSend from '@/api/utils/mailerSend';
import { NextFunction, Request, Response } from 'express';
import logger from '@/config/winston';

export async function sendMail(
    req: Request<Record<string, never>, Record<string, never>, { user: object }>,
    res: Response,
    next: NextFunction,
) {
    try {
        // recipient 생성에 이용
        // const userData = req.body;

        // recipient 담아둘 배열
        const bulkEmails: EmailParams[] = [];

        // 발신자 정보
        const sentFrom = new Sender('kudogEmail@kudog.email', 'kudog');

        // 수신자
        const recipient1 = [
            new Recipient('cksgh1735@gmail.com', 'park chanho1'),
        ];

        const recipient2 = [
            new Recipient('cksgh1735@naver.com', 'park chanho2'),
        ];

        const variable = [
            {
                email: 'cksgh1735@naver.com',
                substitutions: [
                    {
                        var: 'data',
                        value: 'https://blog.kakaocdn.net/dn/bz3hii/btrNvMf4atk/rkUiMcHGdKavNFrurRBLL0/img.png',
                    },
                ],
            },
        ];

        const emailParams1 = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipient1)
            .setSubject('subject')
            .setText('hello world')
            .setHtml('<b>hi naver</b>');
        const emailParams2 = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipient2)
            .setSubject('제목입니다')
            .setVariables(variable)
            .setTemplateId('o65qngkdw53lwr12');

        bulkEmails.push(emailParams1);
        bulkEmails.push(emailParams2);

        const response = await mailerSend.email.sendBulk(bulkEmails);

        res.send(response);
    } catch (err) {
        logger.error(err.toString());
        next(err);
    }
}
