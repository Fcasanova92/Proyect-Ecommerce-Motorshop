

import { config } from 'dotenv';

import {configServer} from './api/server/config.js'

import { dbConnection } from "./api/db/dbConnection.js";

config()

const port = process.env.PORT

const NODE_ENV = process.env.NODE_ENV || 'dev'

const URL_PROD = process.env.URL_PROD

const URL_LOCAL = process.env.URL_LOCAL

dbConnection()

export const app =  configServer()

export const server = app.listen(port, ()=> console.log(NODE_ENV === 'dev' ? `${URL_LOCAL}${port}` : URL_PROD))
