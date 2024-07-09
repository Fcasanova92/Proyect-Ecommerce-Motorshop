import { Router } from 'express';
import { validateToken } from '../../../../helpers/auth/jwt/middleware/validateToken.js';
import { updateUserPassword } from '../../../../helpers/profile/profileFunction.js';



export const router = Router();

router.patch('/update-password', validateToken, async function(req, res) {

  const idUser = req.user.id

  const passwords = req.body

  try {

    const updateUser = await updateUserPassword(idUser, passwords.oldpass, passwords.newpass)
    return res.status(200).json(updateUser)
  } catch (err) {

    console.log(err)
    
  }
  
});