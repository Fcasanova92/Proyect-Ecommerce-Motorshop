import { config } from 'dotenv';

config()

export const URL_BACKEND = process.env.URL || 'http://localhost:3000'