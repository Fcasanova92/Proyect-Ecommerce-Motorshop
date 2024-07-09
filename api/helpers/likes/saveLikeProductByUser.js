import { saveLikeProduct } from "../db/dbQuerys.js"
import { getLikeProductByIdUser } from "./getLikeProductByIdUser.js"

export const saveLikeProductByUser = async (user_id, id_product) => {

    try{

        const productLikeUser = await getLikeProductByIdUser(user_id)

        const validateLikeProduct = productLikeUser.map((like)=>like.product_id).includes(id_product)

        if(productLikeUser.length === 0 || !validateLikeProduct){

                const saveLike = await saveLikeProduct(user_id, id_product)
    
                if(saveLike.insertId){
        
                        return {status:true, message:"Producto agregado en favoritos"}
                }

        }else{

                    return {status:false, message:"El producto ya se encuentra guardado en favoritos"}
                }
}
catch(error){

        throw new Error(error)
    }
   
}