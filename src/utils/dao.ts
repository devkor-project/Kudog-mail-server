import { pool } from '@/config/datasource';
import logger from '@/config/winston';

export async function userPerCategorySet() {
    const connection = await pool.getConnection();
    try {
        const query: string =
            `
        select distinct categorySet, group_concat(email) as emailList from
            (
                select distinct U.userId, U.email , group_concat(distinct C.provider, categoryName) as categorySet from User U
                inner join CategoryPerUser CP on U.userId = CP.userId
                inner join Category C on CP.categoryId = C.categoryId
                where U.status != 'N'
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

export async function getCategoryOnToday(): Promise<Array<[string, string]>> {
    const connection = await pool.getConnection();
    try {
        const query: string =
            `
            select distinct categoryName, Notice.provider from Notice inner join Category C on Notice.categoryId = C.categoryId
            where date = current_date();
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


export async function getNotices(categoryName: string, provider: string): Promise<Object[]> {
    const connection = await pool.getConnection();
    try {
        const query: string =
            `
            select title, content, writer, date_format(date, '%Y-%m-%d') as date, N.provider from Notice N inner join Category C on N.categoryId = C.categoryId
            where categoryName =  '${categoryName}' and N.provider = '${provider}' and date = current_date();
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