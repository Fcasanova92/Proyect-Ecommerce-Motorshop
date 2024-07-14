
import { addNode } from "../../pages/helpers/product/utilities/nodes.js";


const getComments = (data) => {
    return new Promise(async (res,rej)=>{
        try {
            const resp = await axios.post(`/api/product/get-comment`,data, {'Content-Type': 'application/json'});
            console.log(resp.status)
            if(resp){
                return res(resp.data);
            }
            return rej([]);
        } catch (error) {
            console.log("Error inesperado: " + error);
        }
    });
}

const getProduct = (data) => {
    return new Promise(async (res,rej)=>{
        try {
            const resp = await axios.post(`/api/product/get-product-id`,data, {'Content-Type': 'application/json'});
            if(resp){
                return res(resp.data);
            }
            return rej([]);
        } catch (error) {
            console.log("Error inesperado: " + error);
        }
    });
}

const create = async () => {
    const data = {
        id : sessionStorage.getItem("view_id")
    };
    const viewer = document.getElementById('item-viewer');
    const p_data = await getProduct(data);
    if(p_data){
        const card = addNode(viewer, 'article', {class: 'card full-view'});
        const media = addNode(card, 'div', {class : 'media'});
        addNode(media,'img',{class : 'card-thumbnail', src : "../"+p_data.thumbnail, alt : 'Imagen a modo de referencia del producto.'});
        const supportingText = addNode(card, 'div', {class : 'supporting-text'});
        addNode(supportingText, 'p', {class:'overline'}).textContent = "MODELO";
        addNode(supportingText, 'h3', {class:'title-c'}).textContent = p_data.brand;
        addNode(supportingText, 'p', {class:'caption'}).textContent = `${p_data.category} | ${p_data.capacity}cc | ${p_data.color}`;
        addNode(supportingText, 'p', {class:'body-b'}).textContent = p_data.description;
        const footer = addNode(supportingText, 'div', {class : 'footer'});
        const price = addNode(footer, 'div', {class : 'price'});
        addNode(price,'h4',{class:'title'}).textContent = 'Precio: ';
        addNode(price,'span', {class:'amount'}).textContent = p_data.price;
        const c_data = await getComments(data);
        if(c_data.length > 0) {
            const c_wrapper = addNode(card,'ul',{class:'comments'});
            const c_headline = addNode(c_wrapper,'li',{class:'headline'});
            addNode(c_headline,'h2',{class:'title-c'}).textContent = "Comentarios";
            c_data.map(item=>{
                const parent = addNode(c_wrapper, 'li', {class:'message body-d'}).textContent = "*-"+item.message;
            });
        }
    }
}

const run = await create();
