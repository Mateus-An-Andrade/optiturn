import { show_confirmation_menssage } from "../features/confirmMenssage.js"
import { featureRegisterUser } from "../features/registerUser.js"

export function register_user(){ 
    let time = 0
    const currentUser = window.currentUser || JSON.parse(sessionStorage.getItem("user"))
    let confirmation_register_button = document.getElementById("confirmation_button")
    let userType = null
    let payload= null
    const isLeader = document.getElementById("opt_register_worker01")
    const isOperator = document.getElementById("opt_register_worker02")

    isLeader.addEventListener("click",function(){
        userType = "leader"
    })

    isOperator.addEventListener("click",function(){
        userType = "operator"
    })

    confirmation_register_button.addEventListener("click", async function(){
        if(userType ==="leader" ){
            payload = {
                type: "leader",
                name: document.getElementById("name_new_user").value,
                user: document.getElementById("user_gestor").value,
                turn: document.getElementById("shift_gestor").value,
                password: document.getElementById("password_gestor").value
            }
            
             //console.log("tipo de registro:",type)
            }else{
                payload = {
                    type:"operator",
                    name: document.getElementById("name_new_operator").value,
                    user: document.getElementById("user_op").value,
                    password: document.getElementById("password_op").value
                }
            }
         const result = await featureRegisterUser(payload)

            if (result.success){
                console.log("RESULT FINAL:", result);
                show_confirmation_menssage(result.message, time=3000, menu_register, "success")
            } else{
                    console.log("erro do sistema:",result)
                    show_confirmation_menssage(result.message, time=3000,menu_register, "error")
        
            }

        })
    }
    
       

       

