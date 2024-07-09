
import { getProducts, getNewness } from '../../../adapters/product/getProducts.js';
import { getLikes } from '../../../adapters/like/getLikes.js';

export const getAll = async () => await getProducts();
export const getNews = async () => await getNewness();
export const getAllLike = async () => await getLikes();

export const getByFilter = async (form) => {
    if(form) {
        const data = await getAll();
        const query = filterValues(form); 
        return data.filter(item=>
            (query.brands.length === 0 || query.brands.some((brand) => brand === item.brand.toLowerCase())) &&
            (query.colors.length === 0 || query.colors.some((color) => color === item.color.toLowerCase())) && 
            (query.capacity.min <= item.capacity && query.capacity.max >= item.capacity) && 
            query.price.min <= item.price && query.price.max >= item.price
        );
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