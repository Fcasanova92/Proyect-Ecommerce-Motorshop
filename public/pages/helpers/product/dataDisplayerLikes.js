import { addMessage, addCards, removeNodes } from './utilities/nodesLikes.js';
import { getAllLike } from './dataHandler.js';
import { Pagination } from './utilities/pagination.js';

const wrapper = document.getElementById('card-wrapper');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const messageLike = document.querySelector(".messageLike")

export const init = () => {
    const pages = new Pagination();
    getAllLike().then(items=>{
        if(Object.keys(items).length){
            pages.data = items.productData;
            display(wrapper,pages);
        }else{

            messageLike.style.display = "flex"

        }
    });
    next.addEventListener('click',() => {
        pages.setNext(1);
        display(wrapper, pages);
    });
    prev.addEventListener('click',() => {
        pages.setNext(-1);
        display(wrapper, pages);
    });
}

const display = (wrapper,pagination,logger) => {
    removeNodes(wrapper);
    if(logger){
        removeNodes(logger);
        addMessage(
            logger,
            pagination.data.length <= 0 ? 'Actualmente no hay productos disponibles que coincidan con tu búsqueda.' : `Se han encontrado ${pagination.data.length} productos que coinciden con los criterios de su búsqueda.`,
            pagination.data.length <= 0 ? 'error' : 'success'
        );
    }
    addCards(wrapper,pagination.getCurrent());
    prev.style.visibility = pagination._index <= 0 ? "hidden" : "visible";
    next.style.visibility = pagination._index >= pagination._pageCount ? "hidden" : "visible";
}

export const hide = (id) => {
    setTimeout(()=>document.getElementById(id).classList.toggle('visible'),100);
}