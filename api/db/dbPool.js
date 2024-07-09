import { config } from 'dotenv';
import mysql from 'mysql';


config()

export const pool = mysql.createPool({
  connectionLimit: 10, // Ajusta el límite según tus necesidades
  host:  NODE_ENV === 'prod' ? process.env.PROD_DB_HOST :  process.env.DB_HOST ,
  user:  NODE_ENV === 'prod' ? process.env.PROD_DB_USER : process.env.DB_USER,
  password : NODE_ENV === 'prod' ? process.env.PROD_DB_PASSWORD : process.env.DB_PASSWORD,
  database: NODE_ENV === 'prod' ? process.env.PROD_DB_DATABASE : process.env.DB_DATABASE
});
