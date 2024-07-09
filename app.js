

import { config } from 'dotenv';

import {server} from './api/server/server.js'

import { dbConnection } from "./api/db/dbConnection.js";

config()

const port = process.env.PORT

dbConnection()

const app =  server()

app.listen(port, ()=> console.log(`Open your browser and visit: http://localhost:${port}/`))