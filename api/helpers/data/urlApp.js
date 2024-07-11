import { config } from 'dotenv';

config()

export const getUrlApp = () => {

    const NODE_ENV = process.env.NODE_ENV || 'dev'

    const URL_PROD = process.env.URL_PROD
    
    const URL_LOCAL = process.env.URL_LOCAL

    const port = process.env.PORT
    
    const url = NODE_ENV === 'dev' ? `${URL_LOCAL}${port}` : URL_PROD

    return url

};