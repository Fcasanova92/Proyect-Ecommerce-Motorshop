import express from 'express'
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';


import cors from 'cors'
import { privateRoutes } from '../routes/index.js';
import { publicRoute } from '../routes/public/routes.js';

config()

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

    app.get('/data', (req, res) => {

        const port = process.env.PORT

        const NODE_ENV = process.env.NODE_ENV || 'dev'

        const URL_PROD = process.env.URL_PROD

        const URL_LOCAL = process.env.URL_LOCAL

        const url = NODE_ENV === 'dev' ? `${URL_LOCAL}${port}` : URL_PROD
    ;
    // Aquí puedes utilizar urlBackend en tu lógica de backend
    res.json({ url: url });
    });

    const publicRoutes = publicRoute(__filename,  __dirname)

    app.use('/api', privateRoutes );
    app.use('/', publicRoutes );

        
    return app
}
