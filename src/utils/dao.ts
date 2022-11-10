import { pool } from '@/config/datasource';
import logger from '@/config/winston';

export async function userPerCategorySet() {
    const connection = await pool.getConnection();
    try {
        const query: string =
            `
        select distinct categorySet, group_concat(email) as emailList from
            (
                select distinct U.userId, U.email , group_concat(distinct categoryName) as categorySet from User U
                inner join CategoryPerUser CP on U.userId = CP.userId
                inner join Category C on CP.categoryId = C.categoryId
                group by U.userId
            ) M
        group by categorySet;
        `;

        const row = await connection.query(query);
        return row[0];

    } catch (error) {
        logger.error(`userPerCategorySet Error, message :`, { message: error.toString() })
        return null;
    } finally {
        await connection.release();
    }
}

//임의 작성, 동작x
export async function getCategoryOnToday(): Promise<string[]> {
    const connection = await pool.getConnection();
    try {
        const query: string =
            `
            select distinct categoryName from Notice inner join Category C on Notice.categoryId = C.categoryId
            where date = current_date();;
        `;

        const row = await connection.query(query);
        return Object.values(JSON.parse(JSON.stringify(row[0])));

    } catch (error) {
        logger.error(`getCategoryOnToday Error, message :`, { message: error.toString() })
        return null;
    } finally {
        await connection.release();
    }
}


export async function getNotices(category: string): Promise<Object[]> {
    const connection = await pool.getConnection();
    try {
        const query: string =
            `
            select title, content, writer, date, provider from Notice inner join Category C on Notice.categoryId = C.categoryId 
            where categoryName =  '${category}' and date = current_date();
        `;

        const row = await connection.query(query);

        return Object.values(JSON.parse(JSON.stringify(row[0])));

    } catch (error) {
        logger.error(`getContent Error, message :`, { message: error.toString() })
        return null;
    } finally {
        await connection.release();
    }
}