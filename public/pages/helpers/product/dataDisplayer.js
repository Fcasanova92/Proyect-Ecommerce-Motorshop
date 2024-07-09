import { addMessage, addCards, addMiniCard, removeNodes } from './utilities/nodes.js';
import { getAll, getByFilter, getNews } from './dataHandler.js';
import { Pagination } from './utilities/pagination.js';

let filterVisible = false;

const filter = document.getElementById('filter');
const logger = document.getElementById('filter-message');
const wrapper = document.getElementById('card-wrapper');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

export const init = () => {
    getNews().then(news=>{
        const nWrapper = document.getElementById('newness');
        displayNews(nWrapper,news);
    });
    const pages = new Pagination();
    getAll().then(items=>{
        pages.data = items;
        display(wrapper,pages);
    });
    filter.addEventListener('submit', (event)=>{
        event.preventDefault();
        if(window.innerWidth < 768 && filter.classList.contains('visible')) {
            hide(filter.id);
        }
        getByFilter(event.target).then(items=>{
            pages.data = items;
            display(wrapper,pages,logger);
        });
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

const displayNews = (wrapper, news) => {
    news.map(item=>addMiniCard(wrapper,item));
}

export const hide = (id) => {
    setTimeout(()=>document.getElementById(id).classList.toggle('visible'),100);
}