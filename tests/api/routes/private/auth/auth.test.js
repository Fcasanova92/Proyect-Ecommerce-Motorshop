
import supertest from "supertest";
import { app } from "../../../../../app.js";

const api = supertest(app)

test('auth returned as json ', async () => {

   await api.post('/api/auth/regiser')
   .expect (200)
   .expect('Content-Type', /application\/json/ )
    
});
