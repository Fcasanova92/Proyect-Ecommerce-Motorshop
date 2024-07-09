import  {dbConnection, getConnection}  from './dbConnection.js';

import { config } from 'dotenv';

config()

dbConnection()

const db = getConnection()

  // Ejecutar la consulta para crear la tabla 'users'
db.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
)`, (err) => {
  if (err) {
    console.error('Error al crear la tabla "users":', err);
    db.end()
    return;
  }
  console.log('Tabla "users" creada exitosamente');
});

// Ejecutar la consulta para crear la tabla 'productos'
db.query(`CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255) UNIQUE NOT NULL,
    newness BOOLEAN,
    brand VARCHAR(255),
    category VARCHAR(255),
    capacity INT NOT NULL,
    color VARCHAR(15) NOT NULL,
    thumbnail VARCHAR(200),
    description VARCHAR (80),
    price INT NOT NULL
)`, (err) => {
  if (err) {
    console.error('Error al crear la tabla "product":', err);
    db.end()
    return;
  }
  console.log('Tabla "productos" creada exitosamente');
});

// Ejecutar la consulta para crear la tabla 'comments'
db.query(`CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  message VARCHAR(255) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product(id)
)`, (err) => {
if (err) {
  console.error('Error al crear la tabla "comments":', err);
  db.end()
  return;
}
console.log('Tabla "comments" creada exitosamente');
});

// Ejecutar la consulta para crear la tabla 'likes'
db.query(`CREATE TABLE IF NOT EXISTS likes (
  like_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);`, (err) => {
if (err) {
  console.error('Error al crear la tabla "likes":', err);
  db.end()
  return;
}
console.log('Tabla "likes" creada exitosamente');
});

db.end()