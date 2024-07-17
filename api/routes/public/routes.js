import { Router } from 'express';
import { join } from 'path';

export const router = Router();


const publicDirectory = join(process.cwd(), 'public');

router.get('/registro', (req, res) => {
  res.sendFile(join(publicDirectory, 'pages/auth/register.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(join(publicDirectory, 'pages/auth/login.html'));
});

router.get('/favoritos', (req, res) => {
  res.sendFile(join(publicDirectory, 'pages/like/like.html'));
});

router.get('/profile', (req, res) => {
  res.sendFile(join(publicDirectory, 'pages/profile/userprofile.html'));
});

router.get('/*', (req, res) => {
  res.sendFile(join(publicDirectory, 'index.html'));
});

