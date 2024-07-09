export const getproductsbyfilter = async (form) => {
    const data = filterValues(form);
    try{

        const response =  await axios.post("https://proyect-ecommerce-motor-d3rb.onrender.com/api/product/get-product-filter", data, {

            'Content-Type': 'application/json'
        })

        const {token} = response.data

        if (response.status >= 200 && response.status < 300){
        
            sessionStorage.setItem('token', token);
                
            return {status:true, message:"Bienvenido a MotorShop"}
        }
      
        } catch (error) {
        
        if(error.response.status === 401){

            return {status:false, id:error.response.data.id , message:error.response.data.message}
        }
    }
}

const filterValues = (form) => {
    return {
        brands : getCheckedInputs(form.brand),
        colors : getCheckedInputs(form.color),
        capacity : form.capacity.value ? JSON.parse(form.capacity.value) : {
             min: 0, 
             max: 5000 
        },
        price : { 
            min: form.minPrice.value ? parseInt(form.minPrice.value) : 0, 
            max: form.maxPrice.value ? parseInt(form.maxPrice.value) : 100000000
        }
    }
}

const getCheckedInputs = (collection) => {
    let data = [];
    for (const input of collection) {
        if(input.checked) {
            data.push(input.value);
        }
    }
    return data;
}