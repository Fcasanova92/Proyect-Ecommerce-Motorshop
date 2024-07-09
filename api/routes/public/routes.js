// endpoints para obtener productos
import { Router } from 'express';

import { join} from 'path';


export const publicRoute = (__filename, __dirname) => {

  const router = Router();

  console.log(__filename, __dirname)

  router.get('/registro', (req, res) => {
    res.sendFile(join(__dirname, '../../public/pages/auth', 'register.html'));
  });
  
  router.get('/login', (req, res) => {
    res.sendFile(join(__dirname, '../../public/pages/auth', 'login.html'));
  });
  
  router.get('/favoritos', (req, res) => {
    res.sendFile(join(__dirname, '../../public/pages/like', 'like.html'));
  });

  router.get('/profile', (req, res) => {
    res.sendFile(join(__dirname, '../../public/pages/profile', 'userprofile.html'));
  });
  
  router.get('/*', (req, res) => {
    res.sendFile(join(__dirname, '../../public', 'index.html'));
  });


return router

}


