// endpoints para obtener productos
import { Router } from 'express';
import { validateToken } from '../../../helpers/auth/jwt/middleware/validateToken.js';
import { getLikeProductByIdUser } from '../../../helpers/likes/getLikeProductByIdUser.js';
import { saveLikeProductByUser } from '../../../helpers/likes/saveLikeProductByUser.js';
import { productJson } from '../../../helpers/product/productJson.js';
import { deleteLikeProductByUser } from '../../../helpers/likes/deleteLikeProductByUser.js';

export const router = Router();

router.get('/get-likes', validateToken, async function(req, res) {

  const idUser = req.user.id

  try {

    const dataProduct = await getLikeProductByIdUser(idUser)

    const productData = await productJson(dataProduct)

    if(dataProduct.length > 0){

      console.log(productData)

      return res.status(200).json({productData})
    }
    
    return res.status(400).json({productData, message:"el usuario no tiene productos favoritos"})
    
  } catch (err) {

    console.log(err)

    return res.status(500).send(`${err}`)
    
  }
  
  
});


router.post('/save-like', validateToken, async function(req, res) {


  const idUser = req.user.id

  const id_product = req.body.product_id


  try {

    const resultSave = await saveLikeProductByUser(idUser, id_product)

    if(resultSave.status){

      return res.status(200).json({message: resultSave.message})
    }

    else{

      return res.status(400).json({message: resultSave.message})
    }

  }catch (err) {

    return res.status(500).send(`${err}`)
    
  }})
  

  router.delete('/delete-like', validateToken, async function(req, res) {
  
    const idUser = req.user.id
  
    const id_product = req.body.product_id
  
  
    try {
  
      const resultDelete = await deleteLikeProductByUser(idUser, id_product)

  
      if(resultDelete.status){
  
        return res.status(200).json({message: resultDelete.message})
      }
  
      else{
  
        return res.status(400).json({message: resultDelete.message})
      }
  
    }catch (err) {
  
      return res.status(500).send(`${err}`)
      
    }})
    
  
  
  


