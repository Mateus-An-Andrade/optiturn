import { registerManager, registerOperator } from "../services/registerUserService.js"

export async function featureRegisterUser(data){

       if (!data){
        return {success:false,
                message: "dados inválidos"
        }
    }

    let response

    if (data.type === "leader"){
        response = await registerManager(data)
    } 
    
    if (data.type === "operator"){
        response = await registerOperator(data)
    }

    if(!response.ok){
         return {
                success: false,
                message: response.data.error
            }
    }

        return {
        success: true,
        message: response.data.message
    }
}
