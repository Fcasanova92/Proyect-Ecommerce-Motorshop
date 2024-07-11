import express from 'express'
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import cors from 'cors'
import { privateRoutes } from '../routes/index.js';
import { publicRoute } from '../routes/public/routes.js';
import { dataRouther } from '../routes/private/data/index.js';

export const server = () => {

    const __filename = fileURLToPath(import.meta.url);

    const __dirname = dirname(__filename);

    const app = express()

    app.use(cors())

    app.use(express.json());

// Middleware para servir archivos estáticos desde 'public'
    app.use(express.static(join(__dirname, '../../public'), {
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

    const publicRoutes = publicRoute(__filename,  __dirname)

    app.use('/api', privateRoutes );
    app.use('/', publicRoutes );
    app.use('/data', dataRouther)

        
    return app
}
