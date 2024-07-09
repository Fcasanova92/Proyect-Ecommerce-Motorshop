export const deleteLike = async (event) => {

    const product_id = parseInt(event.target.id)

    const token = sessionStorage.getItem("token")


    if (!token) {
        console.log("No se encontró el token");
        return;
    }

    try{

        const response =  await axios.delete("https://proyect-ecommerce-motor-d3rb.onrender.com/api/likes/delete-like", {

            'Content-Type': 'application/json',

            headers: {
                'Authorization': `Bearer ${token}`
              },

            data:{
                product_id
            }
        })


        if (response.status >= 200 && response.status < 300){

            alert(response.data.message)

            window.location.reload();

            return
        }
      
          } catch (error) {
            
            if(error.response.status === 400){

                console.log( error.response.data.message)
            }
        }
}