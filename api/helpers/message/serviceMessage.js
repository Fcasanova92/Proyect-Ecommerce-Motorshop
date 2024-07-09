import { transporter } from "./serviceConfig.js";

  export const sendConsultation = async (data)=>{

    const {nombre, apellido, email, consulta} = data

    try {

      const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Consulta de ${nombre} ${apellido}`,
        text: consulta,
      };
  
      const result = await transporter.sendMail(mailOptions) 
        if (result.error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + result.response);
          }
      
    } catch (error) {
      throw new Error("error en el servicio de mensajeria"+error)
    }};



