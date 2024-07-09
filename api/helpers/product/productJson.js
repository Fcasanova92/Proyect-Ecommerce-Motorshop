import { getItemsByID } from "../../helpers/db/dbQuerys.js"



export const productJson = async (dataProduct) => {
    let productJson = []

    return new Promise((resolve, reject) => {
        // Crear un array de promesas para cada producto
        const promises = dataProduct.map(async (element) => {
            try {
                const id = element.product_id
                const productLike = await getItemsByID(id)
                productJson.push (productLike)
            } catch (error) {
                // Manejo de errores individual para cada llamada asíncrona
                reject(`Error al obtener datos para el producto con id ${id}: ${error.message}`)
            }
        })

        // Esperar a que todas las promesas se resuelvan
        Promise.all(promises)
            .then(() => resolve(productJson))
            .catch(error => reject(`Error al resolver todas las promesas: ${error}`))
    })
}