function register_user(){
    let buttons_menu = document.getElementById("buttons_menu")
    let button_register = document.getElementById("register_button")
    let menu_register = document.getElementById("menu_register")

    let option_register01 = document.getElementById("opt_register_worker01")  
        
    let opt_register02 = document.getElementById("opt_register_worker02") 

    let infor_gestor = document.querySelector(".cadastro_gestor_informacoes")

    let infor_operator = document.querySelector(".cadastro_operario_informacoes")


    let confirmation_register_button = document.getElementById("confirmation_button")

    let interface_confirmation = document.querySelector(".mensagem_de_sucesso")

    const close_window_icon = document.querySelectorAll(".fechar_janela")
                                                                                        /*acima temos as variaveis que armazenam as classes e IDs do elementos HTML referentes ao menu de registros */

    close_window_icon.forEach(element => {
        element.addEventListener("click", function(){
            menu_register.style.display = "none";
            history.replaceState({},"","/")
            buttons_menu.style.display = "grid";
        })
    });

    button_register.addEventListener("click",function(){
        history.replaceState({},"","/register_user")
        menu_register.style.display = "grid";
        buttons_menu.style.display = "none";
    })

    option_register01.addEventListener("click",function(){
            infor_gestor.style.display = "flex";
            history.replaceState({},"","/register_user/register_gestor")


        confirmation_register_button.addEventListener("click", function(){
            const name = document.getElementById("name_new_user").value
            const user = document.getElementById("user_gestor").value
            const turn = document.getElementById("shift_gestor").value
            const password= document.getElementById("password_gestor").value


            fetch("/register_gestor",{
                method:"POST",
                headers:{
                    'Content-type': 'application/json',
                },
                body:JSON.stringify({
                    name: name,
                    user: user,
                    turn: turn,
                    password: password

                })
            })

            .then(response => response.json())
            .then(data =>
                console.log("resposta do servidor:",data)
            )

        setTimeout(function(){
            menu_register.style.display = "none"
            buttons_menu.style.display = "grid"  
            interface_confirmation.style.display = "none"
            console.log("Menu principal reativado")
        },3000)
            menu_register.style.display = "none"
            buttons_menu.style.display = "none"  
            interface_confirmation.style.display = "flex"
            console.log("mensagem de sucesso. Cadastro realizado")
        })

            infor_operator.style.display = "none"
    })

    opt_register02.addEventListener("click",function(){
        infor_operator.style.display = "flex"
        history.replaceState({},"","/register_user/register_operator")
        infor_gestor.style.display = "none"
    })


                                                                                        /* acima temos as interações básicas de clique: ao clicar no botão de registro, ele cadastra ou um operador ou um gestor. Ele impede que as opções se "misturem" caso ambas sejam clicadas uma seguida da outra. */


}

                                                                                    /* acima temos a animação mais básica para o evento de confirmação! */

//==========================================================================================================================


function activities(){
    let buttons_menu = document.getElementById("buttons_menu")
    let button_activity = document.getElementById ("activity_button")

    let menu_activity = document.getElementById("menu_activities")

    let confirmation_register_button = document.getElementById("confirmation_button_activity")
    let interface_confirmation = document.querySelector(".mensagem_de_sucesso")

    const close_window_icon = document.querySelectorAll(".fechar_janela")

                                                                                    /*acima temos as variaveis que armazenam as classes e IDs do elementos HTML referentes ao menu de atividades */

    close_window_icon.forEach(element => {
        element.addEventListener("click", function(){
            menu_activity.style.display = "none";
            buttons_menu.style.display = "grid";
        })
    });


    button_activity.addEventListener("click",function(){
        buttons_menu.style.display = "none";
        menu_activity.style.display = "grid";
    })

                                                                                    //acima temos as interações basicas do menu que permite que ele seja aberto para a interação do usuário.


    confirmation_register_button.addEventListener("click",function(){
        setTimeout(function(){
            menu_activity.style.display = "none"
            buttons_menu.style.display = "grid"  
            interface_confirmation.style.display = "none"
            console.log("Menu principal reativado")
        },3000)
            menu_activity.style.display = "none"
            buttons_menu.style.display = "none"  
            interface_confirmation.style.display = "flex"
            interface_confirmation.innerHTML = `  
                                <img src="ICONS/check-mark.png" alt="icone_de_sucesso">
                                    Tarefa registrada!`
            console.log("mensagem de sucesso. Atividade criada!")
    })


                                                                                //acima temos a interação do usuário que mostra a mensagem de sucesso quando a tarefa é registrada.
}


//==========================================================================================================================


function production(){
    let buttons_menu = document.getElementById("buttons_menu")
    let button_production = document.getElementById ("production_button")

    let menu_production = document.getElementById("menu_production")

    let random_direction = document.getElementById("random_direction")
        let tarefas_definidas = document.querySelector(".tarefas_definidas")
        let confirmation_redirection= document.querySelector(".confirmacao_redirecionamento")
        let refresh_task = document.getElementById("refresh_task")
        let confirmation_random_direction = document.getElementById("confirmation_random_direction")

    let specific_direction = document.getElementById("specific_direction")
        let task_for_direction = document.querySelector(".direcionamento_por_operador")
        let operators = document.querySelector(".operadores_disponiveis")
        let confirmation_direction = document.querySelector(".confirmacao_direcionamento")
        let confirmation_button_direction = document.getElementById("confirmation_button_direction")
    
    let interface_confirmation = document.querySelector(".mensagem_de_sucesso")

    const close_window_icon = document.querySelectorAll(".fechar_janela")

                                                                                //acima temos as referencias de elementos html que foram armazenados em variaveis;
    close_window_icon.forEach(element => {
        element.addEventListener("click", function(){  
            menu_production.style.display = "none";
            buttons_menu.style.display = "grid";
        })
    });

    button_production.addEventListener("click",function(){
        menu_production.style.display = "grid"
        buttons_menu.style.display = "none"
    })

    random_direction.addEventListener("click", function(){
        tarefas_definidas.style.display = "grid"
        random_direction.style.opacity = 1
        specific_direction.style.opacity = 0.5
        confirmation_redirection.style.display = "flex"
        task_for_direction.style.display = "none"
        confirmation_direction.style.display = "none"
        operators.style.display = "none"
        refresh_task.style.display = "grid"
        confirmation_random_direction.display = "grid"
    })

    confirmation_random_direction.addEventListener("click",function(){
        setTimeout(function(){
            menu_production.style.display = "none"
            buttons_menu.style.display = "grid"  
            interface_confirmation.style.display = "none"
            console.log("Menu principal reativado")
        },3000)
            menu_production.style.display = "none"
            buttons_menu.style.display = "none"  
            interface_confirmation.style.display = "flex"
            interface_confirmation.innerHTML = `  
                                <img src="ICONS/check-mark.png" alt="icone_de_sucesso">
                                    Tarefas direcionadas!`
            console.log("mensagem de sucesso. tarefas direcionadas")
        })



    refresh_task.addEventListener("click",function(){
        setTimeout(function(){
            menu_production.style.display = "grid"
            buttons_menu.style.display = "none"  
            interface_confirmation.style.display = "none"
            console.log("Menu principal reativado")
        },3000)
            menu_production.style.display = "none"
            buttons_menu.style.display = "none"  
            interface_confirmation.style.display = "flex"
            interface_confirmation.innerHTML = `  
                                    Realizando novo direcionamento!`
            console.log("mensagem de sucesso. tarefas direcionadas")
    })

                                                                        //acima temos o direcionamento aleatório das tarefas, aonde o proprio sistema escolhe quem faz o que das atividades criadas. Aonde ao ser escolhida essa opção, o sistema: libera a interface, faz conexão com o banco de dados, consultando as tarefas que foram criadas e associa de modo aleatório aos operadores

    specific_direction.addEventListener("click",function(){
        random_direction.style.opacity = 0.5
        specific_direction.style.opacity = 1
        confirmation_redirection.style.display = "none"
        task_for_direction.style.display = "grid"
        tarefas_definidas.style.display = "none"
        operators.style.display = "flex"
        confirmation_direction.style.display = "grid"
    })

    confirmation_button_direction.addEventListener("click", function(){
        setTimeout(function(){
            menu_production.style.display = "none"
            buttons_menu.style.display = "grid"  
            interface_confirmation.style.display = "none"
            console.log("Menu principal reativado")
        },3000)
            menu_production.style.display = "none"
            buttons_menu.style.display = "none"  
            interface_confirmation.style.display = "flex"
            interface_confirmation.innerHTML = `  
                                <img src="ICONS/check-mark.png" alt="icone_de_sucesso">
                                    Tarefas direcionadas!`
            console.log("mensagem de sucesso. tarefas direcionadas")
        })

                                                                        //acima temos o direcionamento especifico, aonde o próprio gestor direciona ao seu modo as tarefas.
}
//==========================================================================================================================

function map(){
    let buttons_menu = document.getElementById("buttons_menu")
    let map_button = document.getElementById ("map_button")
    let map_menu = document.getElementById("map_menu")
    let header_map = document.querySelector(".cabeçalho_menu_mapa")
    const close_window_icon = document.querySelectorAll(".fechar_janela")


    let frame_operation_production = document.querySelector(".quadros_de_operadores_em_producao")
    let infor_operator_01 = document.querySelector(".operador01")
    let title_task = document.querySelector(".tarefa_titulo")
    let tasks_in_production_description = document.querySelector(".descricao_tarefa")

    let options_in_map = document.querySelector(".opcoes_em_mapa")
    let button_pause_task = document.getElementById("pause_task")
    let button_redirection_task = document.getElementById("redirection_this_task")
    let options_reatribued = document.getElementById("options_reatribued")
    let button_complete_task = document.getElementById("complete_this_task")
    let confirm_realocation = document.getElementById("confirm_realocation")
    
    let menssage_sucess_task = document.querySelector (".mensagem_de_sucesso")
                                                                    //acima temos as variaveis que são referentes ao menu mapa, que serve para acompanhar as tarefas sendo realizadas pelos operadores.

     close_window_icon.forEach(element => {
        element.addEventListener("click", function(){  
            map_menu.style.display = "none";
            buttons_menu.style.display = "grid";
        })
    });
                                                                    //acima temos o evento de click do icone de fechar a janela/menu mapa.
    map_button.addEventListener("click", function(){
        buttons_menu.style.display = "none"
        map_menu.style.display = "grid"
    })

    title_task.addEventListener("click", function(){
      if (tasks_in_production_description.style.display === "flex") {
        tasks_in_production_description.style.display = "none";
    } else {
        tasks_in_production_description.style.display = "flex";
    }


                                                                    //acima temos o evento de click que aciona a descrição da tarefa que é exibida pelo titulo. Ou seja, ao clicar no titulo, o usuário poderar ver a descrição mais detalhada da tarefa e com o duplo clique ele poderá fechar a tarefa.

            button_pause_task.addEventListener("click", function() {
                if (button_pause_task.value === "PAUSAR") {
                    button_pause_task.value = "CONTINUAR";

                    button_complete_task.style.opacity = 0.5;
                    button_complete_task.disabled = true;

                    button_redirection_task.style.opacity = 0.5;
                    button_redirection_task.disabled = true;
                } else {
                    button_pause_task.value = "PAUSAR";

                    button_complete_task.style.opacity = 1;
                    button_complete_task.disabled = false;

                    button_redirection_task.style.opacity = 1;
                    button_redirection_task.disabled = false;
                }
            });
                                                                    //acima temos o evento de pausar e continuar uma tarefa (com um duplo clique), aonde o sistema fará a comunicação com o banco de dados caso a tarefa seja pausada e continuada em seguida.

        button_redirection_task.addEventListener("click",function(){
            const isVisible = options_reatribued.style.display === "flex";

                if (!isVisible) {
                    options_reatribued.style.display = "flex";

                    button_complete_task.style.opacity = 0.5;
                    button_complete_task.disabled = true;

                    button_pause_task.style.opacity = 0.5;
                    button_pause_task.disabled = true;
                } else {
                    options_reatribued.style.display = "none";

                    button_complete_task.style.opacity = 1;
                    button_complete_task.disabled = false;

                    button_pause_task.style.opacity = 1;
                    button_pause_task.disabled = false;
                }
            });
                                                                    //acima temos o evento de realocar uma tarefa ou cancelar a realocação (com um duplo clique), aonde o sistema fará a comunicação com o banco de dados caso a tarefa seja realocada.
        confirm_realocation.addEventListener("click",function(){
                map_menu.style.display = "none";
                menssage_sucess_task.style.display = "flex";
                menssage_sucess_task.innerHTML = `
                <img src="ICONS/check-mark.png" alt="icone_de_sucesso">
                Tarefa Realocada!
            `;
            console.log("Mensagem de sucesso exibida. tarefa realocada.");

    // Após 3 segundos, oculta a mensagem e exibe o menu novamente
            setTimeout(function () {
                menssage_sucess_task.style.display = "none";
                options_reatribued.style.display = "none";
                button_pause_task.style.opacity = 1
                button_complete_task.style.opacity = 1;
                map_menu.style.display = "grid"; 
                console.log("Menu do mapa reativado.");
                }, 3000);
            })

                                                                    //acima temos a interação com botão "REALOCAR", ele tira a tarefa de um operador e entrega a outro operador, o sistema confirma a realocação, mostra uma mensagem de sucesso e volta com o menu.    

    button_complete_task.addEventListener("click", function () {
    // Oculta o menu e exibe a mensagem de sucesso imediatamente
            map_menu.style.display = "none";
            menssage_sucess_task.style.display = "flex";
            menssage_sucess_task.innerHTML = `
                <img src="ICONS/check-mark.png" alt="icone_de_sucesso">
                Tarefa concluída!
            `;
    console.log("Mensagem de sucesso exibida. Menu do mapa ocultado.");

    // Após 3 segundos, oculta a mensagem e exibe o menu novamente
    setTimeout(function () {
        menssage_sucess_task.style.display = "none";
        map_menu.style.display = "grid"; // ou "block", dependendo do layout do seu menu
        console.log("Menu do mapa reativado.");
    }, 3000);
});

    })
}

function turn(){
    let button_shift_change = document.getElementById("shift_change")
    let buttons_menu = document.getElementById("buttons_menu")
    let turn_menu = document.getElementById("turn_menu")
    let header_turn = document.querySelector(".cabeçalho_menu_turno")
    const close_window_icon = document.querySelectorAll(".fechar_janela")

    close_window_icon.forEach(element => {
        element.addEventListener("click", function(){  
            turn_menu.style.display = "none";
            buttons_menu.style.display = "grid";
        })
    });
            
    button_shift_change.addEventListener("click",function(){
        buttons_menu.style.display = "none"
        turn_menu.style.display = "block"
        header_turn.style.display = "grid"
    })
}

document.addEventListener("DOMContentLoaded", function () {
    register_user();   
    activities();      
    production();
    map();
    turn()
});
