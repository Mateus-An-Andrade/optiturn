function activities(){
    let menu_activity = document.getElementById("menu_activities")
    let confirmation_register_button = document.getElementById("confirmation_button_activity")

                                                                                     /*acima temos as variaveis que armazenam as classes e IDs do elementos HTML referentes ao menu de atividades */
    open_menu("activity_button","menu_activities","grid","/create_activity")
    close_windows("menu_activities",menu_activity )

                                                                                    //acima temos as interações basicas do menu que permite que ele seja aberto para a interação do usuário e a mudança da url do menu.


    confirmation_register_button.addEventListener("click",function(){
        const title_task_created = document.getElementById("title_task_created").value
        const descreption_task_text = document.getElementById("descreption_task_text").value
        const importance_task = document.querySelector('input[name="prioridade"]:checked')?.value;



                                                                                    /*acima temos as variaveis que recebem os campos referentes as informações que o gestor vai imputar referente as tarefas criadas, para enviar para o backend*/

        fetch(`${API_BASE_URL}/create_activity`,{
            method: "POST",
            headers:{
                'content-type': 'application/json',
            },
            credentials: "include",
            body:JSON.stringify({
                title_task_created:title_task_created,
                descreption_task_text: descreption_task_text,
                importance_task: importance_task
            })
        })
            .then(response => response.json())
            .then(data =>
                console.log("resposta do servidor:",data)
            )

            
       show_confirmation_menssage("ATIVIDADE CRIADA!", time=3000,menu_activity)
    })


                                                                                    //acima temos a interação do usuário que mostra a mensagem de sucesso quando a tarefa é registrada.
}