
import {addNode, removeNode, addMessage} from '../../pages/helpers/product/utilities/nodes.js';


let petition_in_progress = false;

const getUserData = (token) => {
    return new Promise(async (res, rej)=>{
        try {
            const resp = await axios.get(`/api/auth/protected`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return resp.status === 200 ? res(resp.data) : rej({});
        } catch (error) {
            console.log(error);
        }
    });
}

const passUpdate = async (data) => {
    petition_in_progress = true;
    const token = sessionStorage.getItem("token");
    try {
        const resp = await axios.patch(`/api/perfil/update-password`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

const handleUpdate = async (event) => {
    event.preventDefault();
    if(petition_in_progress) {
        console.log("peticion en proceso");
        return;
    }
    const data = Object.fromEntries(new FormData(event.target));
    const resp = await passUpdate(data);
    const message =  addMessage(document.getElementById('messages'),resp.message, resp.status ? 'success' : 'error');
    message.style.display = "block";
    setTimeout(()=>{
        removeNode(message);
        event.target.reset();
        petition_in_progress = false;
    },1000);
}

const display = async () => {
    //Usuario de ejemplo por q no puedo traer desde el Server
    const token = sessionStorage.getItem("token");
    const user = await getUserData(token);
    if(user) {
        const user_data_attach = document.getElementById('user-data');
        for (const key in user) {
            const title =  key.toString();
            const body = user[key].toString();
            addNode(user_data_attach,'h2',{class:'title-d'}).textContent = title[0].toUpperCase() + title.slice(1) + ':';
            addNode(user_data_attach,'p',{class:'body-c'}).textContent = body + '.';
        }
    }
}

const run = display();
document.getElementById('update-pass').addEventListener('submit',handleUpdate);
