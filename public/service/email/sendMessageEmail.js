import { setForm } from "../../pages/helpers/form/setForm.js";
import { getValidateDataform } from "../../pages/helpers/form/validateForm.js"

export const sendMessageEmail = async (event) => {

    event.preventDefault()

    const formdata = getValidateDataform(event)

    const messageLabel = document.querySelector("label[for=send]");

    const button = document.getElementById("send")


    if(formdata){

      const {data, inputsArray} = formdata

      const {name, surname, email, consulta} = data
      
      const response = await serviceEmailSend(name, surname, email, consulta)

      if(response.status){

        button.disabled = true

        button.innerHTML = `<span class="loader"></span> Enviando...`

        setTimeout(() => {

          button.innerHTML = `<i class="fa-solid fa-check"></i>`

          messageLabel.innerHTML = response.message

          messageLabel.style.display = "flex"
  
          messageLabel.style.color = "green"

          setForm(inputsArray,messageLabel,button)
          
        }, 2000);

      }
      
    }}

const serviceEmailSend = async (name, surname, consulta) => {

    const data = {

      name, surname, email, consulta
    }

    try{

      const sendEmail = await axios.post("https://proyect-ecommerce-motor-d3rb.onrender.com/api/service/send", data, {
      headers: {

        'Content-Type': 'application/json'

      },
    })

    if (sendEmail.request.status >= 200 && sendEmail.request.status < 300){

      return {status:true, message:sendEmail.data.message}

    }else{

      throw new Error(`Error al enviar el formulario. Código de estado: ${response.status}`)
    }

    }catch(error){

      return (`Error al enviar el formulario: ${error.message}`)
    }

  }

