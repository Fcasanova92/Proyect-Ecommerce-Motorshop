
import supertest from "supertest";
import { app, server } from "../../../../../app.js";
import {getConnection } from "../../../../../api/db/dbConnection.js";

const api = supertest(app)

test('auth returned as json ', async () => {

   await api.post('/api/auth/register')
   .expect (200)
   .expect('Content-Type', /application\/json/ )
    
});

afterAll(()=>{  // hook que se ejecuta luego de los test

   getConnection().end() // cerramos base de datos

   server.close(); // cerramos servidor

})
