import { Router } from 'express';
import {onRegister, onlogin} from '../../../helpers/auth/authFunction.js'
import {  validateToken } from '../../../helpers/auth/jwt/middleware/validateToken.js';

export const router = Router();


// define the home page route
router.post('/register', async function(req, res) {

  try {

    const data = req.body

    const {status, message, token, fieldError} = await onRegister(data)

    if(status){

      return res.status(200).json({token:token, message:message})
    }else{

      return res.status(401).json({fieldError:fieldError, message:message})
    }
    
  } catch (error) {

    return res.status(500).json({ message: error.message });
  }
  
});
// define the about route
router.post('/login', async function(req, res) {

  try {

    const data = req.body

    const {status, message, token, fieldError} = await onlogin(data)

    if(status){
      return res.status(200).json({token:token, message:message})
    }else{

      return res.status(401).json({fieldError, message:message})
    }
    
  } catch (error) {

    return res.status(500).json({ message: error.message });
  }
  
});

router.get('/protected', validateToken, async function(req, res) { 

  try {

    return res.status(200).json({username : req.user.username, surname:req.user.surname})
    
  } catch (error) {

    if(error.response.status === 403)

    return res.status(403).json("dont token provider")
    
  }
  
});

