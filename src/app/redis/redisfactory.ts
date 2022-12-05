import logger from "@/config/winston"
import { redisCli } from "@/app/redis"
import { getNotices } from "@/utils/dao"
import { RowDataPacket } from "mysql2";

export async function redisFactory(categoryList): Promise<void> {
    let contents: string = ''
    const { title, content, writer, date, provider } = { title: "title", content: "content", writer: "writer", date: "date", provider: "provider" };

    for (let category of categoryList) {
        const { categoryName, provider } = category;
        const notices = await getNotices(categoryName, provider);
        for (let i = 0; i < notices.length; i++) {
            const notice = notices[i].valueOf()

            contents +=
                `
            <div>
                <head style="align-items: begin;border: 1px solid;"> 
                    <h1>${notice[title]}</h1>
                    from [${notice[writer]}] (${notice[date]}) 
                </head>
            </div>
            <div>
                <body style="align-items: begin;border: 1px solid;">
                <br>
                    ${notice[content]}
                <br>
                </body>
            </div>
            `
        }

        await redisCli.set(provider + categoryName, contents).then(() => {
            logger.info(`✅ category : "${provider + categoryName}" Add To Redis Cache`)
        })


    }

}