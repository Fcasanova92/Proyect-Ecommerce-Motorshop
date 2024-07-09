import {dbConfig} from './dbConfig.js'

import mysql from 'mysql'

let conecction;

export const dbConnection = () => {

    const {host, user, password, database} = dbConfig

    try {

        conecction = mysql.createConnection({
            host: host,
            user: user,
            password: password
        });
        
        conecction.connect((error)=>{
        
            if(error){
        
                throw Error('error al conectar la base de datos :' + error)
            }
        
            console.log('Connected to database service')
        
        })
    
        conecction.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``, (error) => {
            if (error) {
                throw new Error('Error al crear la base de datos: ' + error);
            }})

         conecction.changeUser({ database }, (error) => {
            if (error) {
                throw new Error('Error al conectar a la base de datos: ' + error);
            }
            console.log(`Connected to database: ${database}`);
        });
        
    } catch (error) {

        console.error('Error al conectar a la base de datos:', error);
        throw error;
        
    }

    }

export const getConnection = () => {
        if (!conecction) {
            throw new Error('No database connection available');
        }
        return conecction;
    };



