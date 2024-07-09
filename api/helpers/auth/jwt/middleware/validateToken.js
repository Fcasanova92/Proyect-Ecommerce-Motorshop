
import {config} from 'dotenv'
import { decodedToken } from '../helpers/decodedToken.js';

config()

export const validateToken = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Token no provisto o mal formado' });
  }

  try {
    const decoded = decodedToken(authHeader.split(" ")[1].trim());
    req.user = { id: decoded.id, username: decoded.name, surname: decoded.surname }; // Extract user details

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token no válido' });
  }
  };
