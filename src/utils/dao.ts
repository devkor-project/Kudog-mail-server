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

// //임의 작성, 동작x
// export async function getCategoryOnToday() {
//     const connection = await pool.getConnection();
//     try {
//         const query: string =
//             `
//             selct categoryName from Category where createdAt = currentTimeStamp();
//         `;

//         const row = await connection.query(query);
//         return row[0];

//     } catch (error) {
//         logger.error(`getCategoryOnToday Error, message :`, { message: error.toString() })
//         return null;
//     } finally {
//         await connection.release();
//     }
// }


// //임의 작성, 동작x
// export async function getContent(category : string) {
//     const connection = await pool.getConnection();
//     try {
//         const query: string =
//             `
//             selct x,x,x,x,x,x, from XX where categoryName = ${category};
//         `;

//         const row = await connection.query(query);
//         return row[0];

//     } catch (error) {
//         logger.error(`getContent Error, message :`, { message: error.toString() })
//         return null;
//     } finally {
//         await connection.release();
//     }
// }