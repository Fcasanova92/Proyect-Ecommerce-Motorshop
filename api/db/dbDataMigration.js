import  {dbConnection, getConnection}  from './dbConnection.js';
import { config } from 'dotenv';
import products from './products.json' assert { type: 'json' };
import comments from './comments.json' assert { type: 'json' };

config();
dbConnection();
const db = getConnection();

// <<---------------------------------------------------------------------------------ESTE CODIGO ANDA--------------------------------------------------------------------------------->>
// Preparo el Arreglo de Categorias, sin q se repita
let categories = [];
data.map(item=>{
    if(!categories.includes(item.type)){
        categories.push(item.type);
    }
});
// Lo Subimos a db
categories.map(categorie => {
    db.query(`SELECT * FROM category WHERE name = "${categorie}"`,(error, result) => {
        if(result.length > 0)
        {
            console.log(`Lo sentimos, la categoría ${categorie} ya existe!.`);
            return;
        }
        db.query(`INSERT INTO category (name) VALUES ("${categorie}")`,()=>{
            console.log(`Exito, se agregó la categoría ${categorie}.`);
            return;
        });
    });
});
// Insertamos los productos y el token (ex sku) lo pasamos con una subconsulta segun el id del name
data.map(item=>{
    db.query(`INSERT INTO product (token, newness, brand, categoryID, capacity, color, thumbnail, description, price) 
        VALUES ("${item.token}", ${item.newness}, "${item.brand}", (SELECT id FROM category WHERE name = "${item.type}" LIMIT 1), ${item.capacity}, "${item.color}", "${item.thumbnail}", "${item.description}", ${item.price})`,(err)=>{
        if(err) {
            console.log(err);
            return;
        }
    });
});



const findOrCreateCategory = async (value) => { 
    return new Promise((resolve, reject) => {
        db.query('SELECT id FROM category WHERE name = ?', [value], (error, result) => {
            if(error) {
                return reject(error);
            }
            if(result.length > 0) {
                return resolve(result[0].id);
            }
            db.query('INSERT INTO category (name) VALUES (?)', [value], (error,result) => {
                if(error) {
                    return reject(error);
                }
                return resolve(result.insertId);
            });
        });
    });
}

const insertProduct = (item) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id FROM product WHERE token = ?', [item.token], (error, result) => {
            if(error) {
                return reject(error);
            }
            if(result.length > 0) {
                return resolve(`El producto ${result[0].id} ya existe en la base de datos`);
            }
            const sql = 'INSERT INTO product (token, newness, brand, category, capacity, color, thumbnail, description, price) VALUES (?)'
            db.query(sql, [[item.token, item.newness, item.brand, item.category, item.capacity, item.color, item.thumbnail, item.description, item.price]], (error, result) => {
                if(error) {
                    return reject(error);
                }
                return resolve(result);
            });
        });
    });
}

// 

const insertComment = (item) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO comments (product_id, message) VALUES (?, ?)'
        db.query(sql, [item.product_id, item.message], (error, result) => {
            if(error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
}

const fill = async () => {
    try {
        for (let i = 0; i < products.length; i++) {
            await insertProduct(products[i]);
        }
        for (let i = 0; i < comments.length; i++) {
            await insertComment(comments[i]);
        }
    } catch (error) {
        console.log(error);
    }
}

await fill();

