import logger from "@/config/winston"
import { redisCli } from "@/app/redis"
import { getNotices } from "@/utils/dao"
import { RowDataPacket } from "mysql2";

export async function redisFactory(categoryList): Promise<void> {
    const { title, content, writer, date, provider } = { title: "title", content: "content", writer: "writer", date: "date", provider: "provider" };

    for (let category of categoryList) {
        const { categoryName, provider } = category;
        let contents: string = ''
        const notices = await getNotices(categoryName, provider);
        for (let i = 0; i < notices.length; i++) {
            const notice = notices[i].valueOf()

            contents +=
                `
                <div class="inner">
                    <h1>${notice[title]}</h1>
                    <h3>${provider} [${categoryName}] </h3> 
                    <h3>${notice[date]}</h3> 
                    <hr>

                    ${notice[content]}
                </div>
                    <br><br><br><br><br><br><br><br><br><hr><hr><br><br>
                `
        }

        await redisCli.set(provider + categoryName, contents).then(() => {
            redisCli.expire(provider + categoryName, 3600);
            logger.info(`✅ category : "${provider + categoryName}" Add To Redis Cache`)
        })
    }

}