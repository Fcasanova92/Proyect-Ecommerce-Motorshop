// endpoints para obtener productos
import { Router } from 'express';
import { getAllItems, getNewness ,getItemsByFilter, getComments, getItemsByID } from '../../../helpers/db/dbQuerys.js';

export const router = Router();

// define the news page route
router.get('/get-newness', async function(req, res) {
  try {
    const newness = await getNewness();
    if(newness){
      res.status(200).json(newness);
    } else{
      res.status(404).send("Error:");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// define the news page route
router.post('/get-product-id', async function(req, res) {
  try {
    const product = await getItemsByID(req.body.id);
    if(product){
      res.status(200).json(product);
    } else{
      res.status(404).send("Error:");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// define the news page route
router.post('/get-comment', async function(req, res) {
  try {
    const newness = await getComments(req.body.id);
    if(newness){
      res.status(200).json(newness);
    } else{
      res.status(404).send("Error:");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// define the home page route
router.get('/get-product', async function(req, res) {

try {
  const product = await getAllItems();

  if(product){

    // devuelve un [] dentro de este se encuentran los productos

    res.status(200).json(product);

  } else{

    res.status(404).send("offset and limit out of range");

  }
  
} catch (error) {

  res.status(500).send(error);
  
}
});

// define the about route
router.get('/get-product-filter', async function(req, res) {

  try {

    // enviar los filtros en un array con clave : valor, la clave seria el campo del formulario y el valor el seleccionado

    const filters = req.body;

    const product_filter = await getItemsByFilter(filters);

    if(product_filter){

     // devuelve un [] dentro de este se encuentran los productos

      res.status(200).json(product_filter);

    }else{

      res.status(404).json({message:"No existen productos con dichos filtros"});

    }
    
  } catch (error) {

    res.status(500).send(error);
    
  }
});
