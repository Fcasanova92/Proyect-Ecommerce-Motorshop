import { getIdProductLikes } from "../db/dbQuerys.js"


export const getLikeProductByIdUser = async (id) => {

    const userId = id

    try {

        const data = await getIdProductLikes(userId)

        return data

    
        
    } catch (error) {

        console.error(error)
        
    }


}