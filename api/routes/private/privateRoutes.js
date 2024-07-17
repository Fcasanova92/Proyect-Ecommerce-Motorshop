// conjunto de rutas que utilizara la aplicacion
import { Router } from 'express';


export const privateRoutes = Router();

import {authRouther} from './auth/index.js'
import {productRouther} from './product/index.js';
import {servicetRouther} from './service/index.js';
import {likeRouther} from './likes/index.js'
import { profileRouther } from './user/profile/index.js';


privateRoutes.use('/auth', authRouther );
privateRoutes.use('/product', productRouther);
privateRoutes.use('/service', servicetRouther);
privateRoutes.use('/likes', likeRouther)
privateRoutes.use('/perfil', profileRouther)
