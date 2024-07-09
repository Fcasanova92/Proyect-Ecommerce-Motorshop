// conjunto de rutas que utilizara la aplicacion
import { Router } from 'express';


export const privateRoutes = Router();

import {authRouther} from './private/auth/index.js'
import {productRouther} from './private/product/index.js';
import {servicetRouther} from './private/service/index.js';
import {likeRouther} from './private/likes/index.js'
import { profileRouther } from './private/user/profile/index.js';

privateRoutes.use('/auth', authRouther );
privateRoutes.use('/product', productRouther);
privateRoutes.use('/service', servicetRouther);
privateRoutes.use('/likes', likeRouther)
privateRoutes.use('/perfil', profileRouther)