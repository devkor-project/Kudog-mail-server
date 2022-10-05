import logger from "@/config/winston"
import { redisCli } from "@/redis"

export async function redisFactory(categoryList: string[]): Promise<void> {

    let contents: string = ''

    for (let category of categoryList) {
        // <To do> DB에서 저장된 공지사항 내용들 가져오기
        // test를 위해 임시 선언
        const title = '제목'
        const main_text = '공지사항 내용, html도 작동되는지 확인 <h3> work? </h3>'
        const imgUrl = 'https://img.stibee.com/24860_1664159708.png'
        const from = '부서'
        const date = '날짜타입 데이터'

        //이 후 loop 타면서 같은 카테고리 내 공지사항 쭉 추가
        // for(~~~~){
        contents +=
            `
            <div>
                <head> 
                    <h1>${title}</h1>
                    from [${from}] (${date}) 
                </head>
            </div>
            <div>
                <body>
                    <img src=${imgUrl}>
                <br>
                    ${main_text}
                <br>
                </body>
            </div>
            `
        // }
        // loop 끝나면 contents 완성    
        await redisCli.set(category, contents).then(() => {
            logger.info(`category : "${category}" done`)
        })
    }

}