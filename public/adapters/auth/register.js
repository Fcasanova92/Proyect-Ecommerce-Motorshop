export const register = async (data) => {

      try{

        const response = await axios.post("https://proyect-ecommerce-motor-d3rb.onrender.com/api/auth/register", data, {
        headers: {
  
          'Content-Type': 'application/json'
  
        }
  ,
      })

      const {token, message} = response.data
  
      if (response.status >= 200 && response.status < 300){

        sessionStorage.setItem("token", token)
        
        return {status:true, message}
  
      }
      
      }catch(error){
  
        if (error.response) {

   
          if (error.response.status === 401) {
    
              return { status: false, id: error.response.data.fieldError , message: error.response.data.message};
      }

    }}

  }
    