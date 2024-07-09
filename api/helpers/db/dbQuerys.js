// funciones para interactuar con la base de datos, dependientes de los parametros necesarios en las rutas de la aplicacion

import { pool } from "../../db/dbPool.js";
import { hashPassword } from "../auth/bycs/hashedPassword.js";

export const getUserByEmail = (email) => {

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          if (err) {
            reject(new Error("Error en la conexión: " + err.message));
            return;
          }
    
          connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
            connection.release(); // Libera la conexión de vuelta al pool
    
            if (error) {
              reject(new Error("Error en la consulta: " + error.message));
              return;
            }
    
            resolve(results[0]);
          });
        });
      });
    };

export const registerUser = async (data)=>{

    const { name, surname, email, password } = data

    const hashedPassword = await hashPassword(password);

    return new Promise((resolve, reject)=>{

        pool.getConnection((err, connection) => {
            if (err) {
              reject(new Error("Error en la conexión: " + err.message));
              return;
            }
      
            connection.query('INSERT INTO users (nombre, apellido, email, password) VALUES (?, ?, ?, ?)', [name, surname, email, hashedPassword], (error, results) => {
              connection.release(); // Libera la conexión de vuelta al pool
      
              if (error) {
                reject(new Error("Error en la consulta: " + error.message));
                return;
              }
      
              resolve(results);
            });
          });
        });

    }
    //Traer todos los produtos
    export const getComments = async (id) => {
      return new Promise((resolve,reject) => {
        const query = 'SELECT * FROM comments WHERE product_id = ?'
        pool.getConnection((error,connection) => {
          if(error){
            reject(new Error(`Error en la conexión: ${error.message}`));
            return;
          }
          connection.query(query, [id] , (error,results) => {
            connection.release();
            if(error){
              reject(new Error("Error en la consulta: " + error.message));
              return;
            }
            resolve(results);
          });
        });
      });
    }
    //Traer todos los produtos
    export const getAllItems = async (offset, limit) => {
      return new Promise((resolve,reject) => {
        const query = 'SELECT * FROM product'
        pool.getConnection((error,connection) => {
          if(error){
            reject(new Error(`Error en la conexión: ${error.message}`));
            return;
          }
          connection.query(query, [limit, offset] , (error,results) => {
            connection.release();
            if(error){
              reject(new Error("Error en la consulta: " + error.message));
              return;
            }
            resolve(results);
          });
        });
      });
    }
    //Traer todos los produtos
    export const getNewness = async () => {
      return new Promise((resolve,reject) => {
        const query = 'SELECT * FROM product WHERE newness = true LIMIT 8'
        pool.getConnection((error,connection) => {
          if(error){
            reject(new Error(`Error en la conexión: ${error.message}`));
            return;
          }
          connection.query(query, (error,results) => {
            connection.release();
            if(error){
              reject(new Error("Error en la consulta: " + error.message));
              return;
            }
            resolve(results);
          });
        });
      });
    }

    export const getItemsByID = async (id) => {
      return new Promise((resolve,reject) => {
        const query = 'SELECT * FROM product WHERE id = ?'
        pool.getConnection((error,connection) => {
          if(error){
            reject(new Error(`Error en la conexión: ${error.message}`));
            return;
          }
          connection.query(query, [id] , (error,results) => {
            connection.release();
            if(error){
              reject(new Error("Error en la consulta: " + error.message));
              return;
            }
            resolve(results[0]);
          });
        });
      });
    }
    //Traer solo los productos segun el filtro
    export const getItemsByFilter = async (filters) => {

      const {brand, capacity, color, price} = filters

      const filtersValues = Object.values(filters)

      // dependiendo de los filtros se anaden dinamicamente a la query

      let query = 'SELECT * FROM product WHERE 1=1 '

      if(brand){

        query += ' AND brand = ?'
      }

      if(capacity){

        query +=  ' AND capacity = ?'
      }
      if(color){

        query += ' AND color = ?'
      }

      if(price){

        query += ' AND price = ?'
      }

      return new Promise((resolve,reject)=>{
        pool.getConnection((error,connection)=>{
          if(error){
            reject(new Error(`Error en la conexión: ${error.message}`));
            return;
          }

          // se pasan directamente los filtros, de esa manera evitamos dependencia directa

          connection.query(query, filtersValues, (error,results) => {
            connection.release();
            if(error){
              reject(new Error("Error en la consulta: " + error.message));
              return;
            }
  
            resolve(results);
          });
        });
      }); 
    }


    export const getIdProductLikes = (id) => {

      return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          if (err) {
            reject(new Error("Error en la conexión: " + err.message));
            return;
          }
    
          connection.query('SELECT * FROM likes WHERE user_id = ?', [id], (error, results) => {
            connection.release(); // Libera la conexión de vuelta al pool
    
            if (error) {
              reject(new Error("Error en la consulta: " + error.message));
              return;
            }
           
            resolve(results || []);
            
          });
        });
      });
    }

    export const saveLikeProduct = (product_id, user_id) => {

      return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          if (err) {
            reject(new Error("Error en la conexión: " + err.message));
            return;
          }
    
          connection.query('INSERT INTO likes (user_id, product_id) VALUES (?,?)', [product_id, user_id], (error, results) => {
            connection.release(); // Libera la conexión de vuelta al pool
    
            if (error) {
              reject(new Error("Error en la consulta: " + error.message));
              return;
            }

            resolve(results);
            
          });
        });
      });
    }

    export const deleteLikeProduct = (user_id, product_id) => {

      return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          if (err) {
            reject(new Error("Error en la conexión: " + err.message));
            return;
          }

          connection.query('DELETE FROM likes WHERE user_id = ? AND product_id = ?', [user_id, product_id], (error, results) => {
            connection.release(); // Libera la conexión de vuelta al pool
    
            if (error) {
              reject(new Error("Error en la consulta: " + error.message));
              return;
            }

            console.log(results.affectedRows, "filas afectadas")

            if (results.affectedRows > 0) {
              resolve(true);
         
            } else {
              resolve(false); // No se eliminó ninguna fila (posiblemente no existía)
            }
            
          });
        });
      });
    }

    export const updatePasswordDatabase = async (id, newPassword)=>{
  
      const hashedPassword = await hashPassword(newPassword);
  
      return new Promise((resolve, reject)=>{
  
          pool.getConnection((err, connection) => {
              if (err) {
                reject(new Error("Error en la conexión: " + err.message));
                return;
              }
        
              connection.query('UPDATE users SET password = ?  WHERE id = ?', [hashedPassword, id], (error, results) => {
                connection.release(); // Libera la conexión de vuelta al pool
        
                if (error) {
                  reject(new Error("Error en la consulta: " + error.message));
                  return;
                }
        
                if (results.affectedRows > 0) {
                  resolve(true);
             
                } else {
                  resolve(false); // No se eliminó ninguna fila (posiblemente no existía)
                }
              });
            });
          });
  
      }

      export const getUserByID = async (id) => {
        return new Promise((resolve,reject) => {
          const query = 'SELECT * FROM users WHERE id = ?'
          pool.getConnection((error,connection) => {
            if(error){
              reject(new Error(`Error en la conexión: ${error.message}`));
              return;
            }
            connection.query(query, [id] , (error,results) => {
              connection.release();
              if(error){
                reject(new Error("Error en la consulta: " + error.message));
                return;
              }
              resolve(results[0]);
            });
          });
        });
      }

    
