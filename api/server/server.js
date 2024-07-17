import express from 'express';
import { join } from 'path';


import cors from 'cors';

import { privateRoutes } from '../routes/private/privateRoutes.js';
import { publicRouter } from '../routes/public/index.js';

export const server = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    // Middleware para servir archivos estáticos desde 'public'
    app.use(express.static(join('public'), {
        // Configurar tipos MIME para archivos específicos
        setHeaders: (res, path, stat) => {
            if (path.endsWith('.js')) {
                res.set('Content-Type', 'application/javascript');
            } else if (path.endsWith('.css')) {
                res.set('Content-Type', 'text/css');
            } else if (path.endsWith('.png')) {
                res.set('Content-Type', 'image/png');
            }
            // Agregar más tipos MIME según sea necesario
        }
    }));


    app.use('/api', privateRoutes);
    app.use('/', publicRouter);

    return app;
};