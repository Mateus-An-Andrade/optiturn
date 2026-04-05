import { open_menu, open_inner_option } from './openWindows.js';
import { close_windows } from './closeWindows.js';
import { API_BASE_URL } from "./config.js";
import { show_confirmation_menssage } from "./confirmMenssage.js    "

export function create_activities(){
    let time = 0
    let menu_activity = document.getElementById("menu_activities")
    let confirmation_register_button = document.getElementById("confirmation_button_activity")

                                                                                     /*acima temos as variaveis que armazenam as classes e IDs do elementos HTML referentes ao menu de atividades */
    open_menu("activity_button","menu_activities","flex","/create_activity")
    close_windows("menu_activities",menu_activity )

                                                                                    //acima temos as interações basicas do menu que permite que ele seja aberto para a interação do usuário e a mudança da url do menu.


     



                                                                                    /*acima temos as variaveis que recebem os campos referentes as informações que o gestor vai imputar referente as tarefas criadas, para enviar para o backend*/

    const importance_task = document.querySelectorAll(".priority_btn")
    let dataImportance = null
    
    importance_task.forEach(btn =>{
                btn.addEventListener("click", function(){
                dataImportance = btn.textContent.trim()
                })
            })
    confirmation_register_button.addEventListener("click",function(){
        
        const title_task_created = document.getElementById("title_task_created").value
        const descreption_task_text = document.getElementById("descreption_task_text").value


        


        console.log("tarefa criada:", title_task_created,descreption_task_text,dataImportance)
        fetch(`${API_BASE_URL}/create/activity`,{
            method: "POST",
            headers:{
                'Content-type': 'application/json',
            },
            credentials: "include",
            body:JSON.stringify({
                title_task_created:title_task_created,
                descreption_task_text: descreption_task_text,
                importance_task: dataImportance
            })
        })
            .then(response => response.json())
            .then(data =>{
                const realResponse = data
                console.log(realResponse)

                if(realResponse.status === "success"){
                    show_confirmation_menssage(realResponse.message, time=3000,menu_activity, "success")
                }else{
                    show_confirmation_menssage(realResponse.message, time=3000,menu_activity, "error")
                }
            })
       
    })


                                                                                    //acima temos a interação do usuário que mostra a mensagem de sucesso quando a tarefa é registrada.
}