import { URL } from "../../../api/server/url"

export const getLikes = async () => {

    const token = sessionStorage.getItem("token")
   
    try{

        const response =  await axios.get(`${URL}/api/likes/get-likes`, {

            'Content-Type': 'application/json',

            headers: {
                'Authorization': `Bearer ${token}`
              }
        })

        if (response.status >= 200 && response.status < 300){
                
            return response.data
        }

      
          } catch (error) {
            
            if(error.response.status === 400){

                return error.response.data.productData

            }
        }
}