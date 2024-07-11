

import { Router } from 'express';

import { getUrlApp } from '../../../helpers/data/urlApp.js';

export const router = Router();

router.get('/data', (req, res) => {

    const url = getUrlApp()
       
    // Aquí puedes utilizar urlBackend en tu lógica de backend
    res.json({ url: url });
    });