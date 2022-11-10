import logger from "@/config/winston"
import { redisCli } from "@/app/redis"
import { getNotices } from "@/utils/dao"
import { RowDataPacket } from "mysql2";

export async function redisFactory(categoryList): Promise<void> {
    let contents: string = ''
    const { title, content, writer, date, provider } = { title: "title", content: "content", writer: "writer", date: "date", provider: "provider" };

    for (let category of categoryList) {
        const notices = await getNotices(category);
        for (let i = 0; i < notices.length; i++) {
            const notice = notices[i].valueOf()

            contents +=
                `
            <div>
                <head> 
                    <h1>${notice[title]}</h1>
                    from [${notice[writer]}] (${notice[date]}) 
                </head>
            </div>
            <div>
                <body>
                <br>
                    ${notice[content]}
                <br>
                </body>
            </div>
            `
        }

        await redisCli.set(category, contents).then(() => {
            logger.info(`✅ category : "${category}" Add To Redis Cache`)
        })


    }

}