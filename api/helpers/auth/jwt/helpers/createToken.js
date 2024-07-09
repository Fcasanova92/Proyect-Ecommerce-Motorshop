import {config} from 'dotenv'
import jwt from 'jsonwebtoken'

config()

export const createToken = (id, name, surname) => {

    try {

        const token = jwt.sign({ id, name, surname }, process.env.SECRET_KEY, { expiresIn: "1h" });

        return token

        
    } catch (error) {

        throw new Error(error)
        
    }

}

