import { config } from 'dotenv';

config()

const NODE_ENV = process.env.NODE_ENV || 'dev'

export const dbConfig = {
        host:  NODE_ENV === 'prod' ? process.env.PROD_DB_HOST :  process.env.DB_HOST ,
        user:  NODE_ENV === 'prod' ? process.env.PROD_DB_USER : process.env.DB_USER,
        password : NODE_ENV === 'prod' ? process.env.PROD_DB_PASSWORD : process.env.DB_PASSWORD,
        database: NODE_ENV === 'prod' ? process.env.PROD_DB_DATABASE : process.env.DB_DATABASE

}
