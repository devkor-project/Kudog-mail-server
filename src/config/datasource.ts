import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    port: 3306,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// import 'reflect-metadata';
// import { DataSource } from 'typeorm';
// import { join } from 'path';
// import dotenv from 'dotenv';

// dotenv.config();
// // To do : 개발용, 배포용 분리
// export const AppDataSource = new DataSource({
//     type: 'mysql',
//     host: process.env.DB_ENDPOINT,
//     port: 3306,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     synchronize: false,
//     logging: true, // 개발용
//     entities: [join(__dirname, '../entities/*{.ts,.js}')],
//     migrations: [],
//     subscribers: [],
// });