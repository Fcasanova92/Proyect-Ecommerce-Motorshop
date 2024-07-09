import { deleteLikeProduct } from "../db/dbQuerys.js"

export const deleteLikeProductByUser = async (user_id, id_product) => {

    try{

        const saveLike = await deleteLikeProduct(user_id, id_product)

        if(saveLike){
        
                    return {status:true, message:"Producto eliminado de favoritos"}
        }else{

                return {status:false, message:"el producto likeado no pudo ser eliminado"}
                }
}
catch(error){

        throw new Error(error)
    }
   
}