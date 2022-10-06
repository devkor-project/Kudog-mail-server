import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    port: 3306,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});