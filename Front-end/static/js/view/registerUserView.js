import { show_confirmation_menssage } from "../features/confirmMenssage.js"
import { featureRegisterUser } from "../features/registerUser.js"

export function register_user(){ 
    let time = 0
    const currentUser = window.currentUser || JSON.parse(sessionStorage.getItem("user"))
    let confirmation_register_button = document.getElementById("confirmation_button")

    confirmation_register_button.addEventListener("click", async function(){

        const isLeader = document.getElementById("opt_register_worker01").checked

        let payload= null

        if (isLeader === true){
            payload = {
                type: "leader",
                name: document.getElementById("name_new_user").value,
                user: document.getElementById("user_gestor").value,
                turn: document.getElementById("shift_gestor").value,
                password: document.getElementById("password_gestor").value
            }
            console.log("PAYLOAD:", payload)
        } else {
            payload = {
                type: "operator",
                name: document.getElementById("name_new_operator").value,
                manager_id: currentUser.id
                
               /* user: document.getElementById("user_operator").value,
                turn: document.getElementById("shift_operator").value,
                password: document.getElementById("password_operator").value*/
            }
            console.log("PAYLOAD:", payload)
        }

        const result = await featureRegisterUser(payload)

        if (result.success){
            show_confirmation_menssage("USUÁRIO CADASTRADO!", time=3000, menu_register)
        } else {
            alert(Error)
        }

    })
}