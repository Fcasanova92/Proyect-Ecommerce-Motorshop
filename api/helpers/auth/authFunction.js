import { getUserByEmail, registerUser } from "../db/dbQuerys.js";
import { comparePassword } from "./bycs/comparePassword.js";
import { createToken } from "./jwt/helpers/createToken.js";

export const onRegister = async (data) => {
   
    try { 
   
       const user =  await getUserByEmail(data.email);
       
       if (user !== undefined) {
     
           return ({status:false,  fieldError:"email", message:'Este correo electrónico ya está en uso'});
       }
   
       const register = await registerUser(data)

       if(register){

        const idUser = register.insertId

        const token = createToken( idUser, data.name, data.surname)

        return({status:true, token:token, message:"Usuario registrado"})

       }
       
    } catch (error) {
       throw new Error(`Error en el registro del usuario: ${error}`);
    }
    };
   
   
export const onlogin = async (data) => {

       try {
           const { email, password } = data;

           const user = await getUserByEmail(email);

           const checkedPassword = await comparePassword(password, user.password)

           console.log(checkedPassword)
        
           if (user) {
               if (checkedPassword) {
                    
                    const token = createToken(user.id, user.nombre, user.apellido)

                   return ({status:true, token}); // Contraseña correcta
               } else {
                   return({status:false, fieldError:"password", message:"Contraseña incorrecta"});
               }
           } else {
               return({status:false, fieldError:"email", message:"Email incorrecto"});
           }
       } catch (error) {
           throw new Error("Error en el logeo: " + error.message);
       }
   };
   