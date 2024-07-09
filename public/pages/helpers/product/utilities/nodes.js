//Agrega un nodo hijo al padre y configura sus atributos 
export const addNode = (parent,tag,attr) => {
    if(parent) {
        const node = document.createElement(tag);
        if(attr) {
            for (const prop in attr) {
                node.setAttribute(prop,attr[prop]);
            }
        }
        parent.appendChild(node);
        return node;
    }
    return console.log("El elemento padre ,al cual quieres agregar un nodo, no existe o es null");
}
// Remueve un nodo en especifico
export const removeNode = (node) => {
    node.parentNode.removeChild(node); 
}
//Remueve todos los nodos hijo dentro del padre
export const removeNodes = (parent) => {
    if(parent !== null && parent !== undefined) {
        while(parent.firstChild) {
            const node = parent.firstChild;
            parent.removeChild(node);
        }
        return;
    }
    return console.log("El elemento padre proporcionado para la acción de borrar nodos no existe o es nulo");
}

//Agrega un nodo con texto al padre 
export const addMessage = (parent,message,type) => {
    const node = addNode(parent, 'p', {class: `message ${type}`});
    node.textContent = message;
    return node;
}

//Agrega un nodo carta con información al padre 
export const addCard = (parent,data) => {
    const token = sessionStorage.getItem("token");
    const card = addNode(parent, 'article', {class: 'card fx-deep-shadow-dinamyc fx-move-up'});
    const media = addNode(card, 'div', {class : 'media'});
    addNode(media,'img',{class : 'card-thumbnail', src :data.thumbnail, alt : 'Imagen a modo de referencia del producto.'});
    const supportingText = addNode(card, 'div', {class : 'supporting-text'});
    addNode(supportingText, 'p', {class:'overline'}).textContent = "MODELO";
    addNode(supportingText, 'h3', {class:'title-c'}).textContent = data.brand;
    addNode(supportingText, 'p', {class:'caption'}).textContent = `${data.category} | ${data.capacity}cc | ${data.color}`;
    addNode(supportingText, 'p', {class:'body-b'}).textContent = data.description;
    const footer = addNode(supportingText, 'div', {class : 'footer'});
    const price = addNode(footer, 'div', {class : 'price'});
    addNode(price,'h4',{class:'title'}).textContent = 'Precio: ';
    addNode(price,'span', {class:'amount'}).textContent = data.price;
    const actions = addNode(footer, 'ul', {class:'actions'});
    const see = addNode(actions, 'span', {class:'see'});
    see.addEventListener('click',(e)=>{
        sessionStorage.setItem("view_id",data.id);
        window.location.href = "pages/viewitem.html";
    });
    addNode(see,'i', {class:'fa-regular fa-eye '});
    if(token) {
        const like = addNode(actions, 'span', {class:'like'});
        like.onclick = () => {like.classList.toggle('active')};
        addNode(like,'i', {class:"fa-regular fa-thumbs-up", id:`${data.id}`, onclick:"saveLike(event)"});

    }
}

export const addMiniCard = (parent,data) => {
    const token = sessionStorage.getItem("token");
    const card = addNode(parent, 'article', {id:`${data.id}`, class: 'card fx-deep-shadow-dinamyc fx-move-up'});
    const media = addNode(card, 'div', {class : 'media'});
    addNode(media,'img',{class : 'card-thumbnail', src : data.thumbnail, alt : 'Imagen a modo de referencia del producto.'});
    const supportingText = addNode(card, 'div', {class : 'supporting-text'});
    addNode(supportingText, 'p', {class:'overline'}).textContent = "MODELO";
    addNode(supportingText, 'h3', {class:'title-d'}).textContent = data.brand;
    const footer = addNode(supportingText, 'div', {class : 'footer'});
    const actions = addNode(footer, 'ul', {class:'actions'});
    const see = addNode(actions, 'span', {class:'see'});
    see.addEventListener('click',(e)=>{
        sessionStorage.setItem("view_id",data.id);
        window.location.href = "pages/viewitem.html";
    });
    addNode(see,'i', {class:'fa-regular fa-eye '});
    if(token) {
        const like = addNode(actions, 'a', {class:'like'});

        addNode(like,'i', {class:"fa-regular fa-thumbs-up", id:`${data.id}`, onclick:"saveLike(event)"});
       
    }
}

//Agrega un nodos carta con información al padre 
export const addCards = (parent,data) => {
    if(Array.isArray(data)) {
        data.map(item => addCard(parent,item));
    }
}