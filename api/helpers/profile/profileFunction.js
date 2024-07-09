import {comparePassword} from '../auth/bycs/comparePassword.js'
import {updatePasswordDatabase} from '../db/dbQuerys.js'
import {getUserByID} from '../db/dbQuerys.js'

export const updateUserPassword = async (idUser, oldPassword, newPasword) => {
    const user = await getUserByID(idUser);
    if(!oldPassword || !newPasword) {
        return ({status:false, message:"Por favor, llene todos los campos"});
    }
    try {
        const checkedPassword = await comparePassword(oldPassword, user.password)
        if (checkedPassword) {
            //const updatePassword = updatePasswordDatabase(idUser, newPasword);
            return ({status:true, message:"La contraseña se actualizo correctamente"});
        } else {
            return({status:false, fieldError:"password", message:"Contraseña no corresponde al perfil"});
        }
    } catch (error) {
        throw new Error("Error: " + error.message);
    }
};