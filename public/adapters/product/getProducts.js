export const getProducts = () => {
    return new Promise(async (res,rej)=>{
        try {
            const resp = await axios.get("https://proyect-ecommerce-motor-d3rb.onrender.com/api/product/get-product");
            if(resp){
                return res(resp.data);
            }
            return rej([]);
        } catch (error) {
            console.log("Error inesperado: " + error);
        }
    });
}

export const getNewness = () => {
    return new Promise(async (res,rej)=>{
        try {
            const resp = await axios.get("https://proyect-ecommerce-motor-d3rb.onrender.com/api/product/get-newness");
            if(resp){
                return res(resp.data);
            }
            return rej([]);
        } catch (error) {
            console.log("Error inesperado: " + error);
        }
    });
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