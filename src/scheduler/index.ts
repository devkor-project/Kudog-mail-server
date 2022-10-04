import logger from '@/config/winston';
import schedule from 'node-schedule'
import { redisCli } from "@/index";

logger.info(`Scheduler has been registered`);

export function testJob() {
    let minuteRule = new schedule.RecurrenceRule();
    minuteRule.minute = 14;
    const specificTimeJob = schedule.scheduleJob(minuteRule, async function () {
        logger.info('시간이 되었습니다. 실행합니다.');

        // 1. <To do> 오늘 생성된 공지사항들의 카테고리 추출
        const categoryList = ['A'] // *임시 선언*

        // 2. 각 카테고리 마다 오늘 생성된 모든 공지사항을 담아서 html 생성
        // !! 나중에 따로 로직 분리 !!
        let contents = ''
        for (let category of categoryList) {
            // <To do> DB에서 저장된 공지사항 내용들 가져오기
            // test를 위해 임시 선언
            const title = '제목'
            const main_text = '공지사항 내용, html도 작동되는지 확인 <h3> work? </h3>'
            const imgUrl = 'https://cs.korea.ac.kr/_res/editor_image/2022/10/OEuKOTXVtVmIfAQHhGzt.jpg'
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

            //3. Redis에 저장 key(category) value(contents)
            // caching으로 각 카테고리 set마다 contents 생성할 필요 없이 재활용 가능토록
            redisCli.set(category, contents)
        }


    })
}