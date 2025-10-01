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

                                                                                /* acima temos a mudança da url ao entrar no menu e a captura dos valores quando o botão de "cadastrar" é clicado.*/
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
                                                                        /*acima temos a conexão com o backend, ele pega as informações que estão no front e foram capturadas pelas variaveis que armazena os inputs, cria um arquivo JSON, e envia para o back end para a rota do gestor */
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
        infor_operator.style.display = "grid"
        history.replaceState({},"","/register_user/register_operator")
        infor_gestor.style.display = "none"

        confirmation_register_button.addEventListener("click",function(){
            const name_operator = document.getElementById("name_new_operator").value
            const fixed_op = document.getElementById("fixed_operator").value
            const temp_op = document.getElementById("temporary_operator").value

            fetch("/register_operator",{
                method: "POST",
                headers:{
                    'content-type': 'application/json',
                },
                body:JSON.stringify({
                    name_operator:name_operator,
                    fixed_op:fixed_op,
                    temp_op:temp_op
                })

            })

            .then(response => response.json())
            .then(data =>
                console.log("resposta do servidor:",data)
            )

                                                    
                                                                        /*acima temos a conexão com o backend, ele pega as informações que estão no front e foram capturadas pelas variaveis que armazena os inputs, cria um arquivo JSON, e envia para o back end para a rota do operador */

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

    })
}

                                                                                    /* acima temos a animação mais básica para o evento de confirmação! */

//==========================================================================================================================


function activities(){
    let buttons_menu = document.getElementById("buttons_menu")
    let button_activity = document.getElementById ("activity_button")

    let menu_activity = document.getElementById("menu_activities")

    let confirmation_register_button = document.getElementById("confirmation_button_activity")
    let interface_confirmation = document.querySelector(".mensagem_de_sucesso")
    const text_confirmation = document.getElementById("text_confirmation").innerText = "Tarefa criada!"

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
        history.replaceState({},"","/create_activity")
        menu_activity.style.display = "grid";
    })

                                                                                    //acima temos as interações basicas do menu que permite que ele seja aberto para a interação do usuário e a mudança da url do menu.


    confirmation_register_button.addEventListener("click",function(){
        const title_task_created = document.getElementById("title_task_created").value
        const descreption_task_text = document.getElementById("descreption_task_text").value
        const importance_task = document.querySelector('input[name="prioridade"]:checked')?.value;



                                                                                    /*acima temos as variaveis que recebem os campos referentes as informações que o gestor vai imputar referente as tarefas criadas, para enviar para o backend*/

        fetch("/create_activity",{
            method: "POST",
            headers:{
                'content-type': 'application/json',
            },
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


        setTimeout(function(){
            menu_activity.style.display = "none"
                buttons_menu.style.display = "grid"  
                interface_confirmation.style.display = "none"
                text_confirmation.style.display = "none"
                console.log("Menu principal reativado")
            },3000)
                menu_activity.style.display = "none"
                buttons_menu.style.display = "none"  
                interface_confirmation.style.display = "flex"
                text_confirmation.style.display = "flex"
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
    let icon_sucess = document.querySelector(".icone_de_sucesso")
    const text_confirmation = document.getElementById("text_confirmation").innerText = "Tarefa criada!"

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
        history.replaceState({},"","/production_menu")
    })

   random_direction.addEventListener("click", function(){
        tarefas_definidas.style.display = "grid"
        random_direction.style.opacity = 1
        specific_direction.style.opacity = 0.5
        history.replaceState({},"","/production_menu/random_direction")

       fetch("/production_menu_random_direct",{
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({refresh: false })

       })
       .then(response => response.json())
       .then(data =>{
           console.log("tarefas enviadas pelo servidor:", data)

            let operator_name_task = []

            data.forEach(task => {
                if(!operator_name_task.includes(task.nome_operador)) {
                    operator_name_task.push(task.nome_operador)
                }
            })
            console.log(operator_name_task); 

            operator_name_task.forEach(name =>{
                let new_frame_op = document.createElement("div")
                new_frame_op.classList.add("direcionamento_aleatorio_de_operadores")
                new_frame_op.style.display="block"
                                                                            //criação de quadro para operadores
                let name_op_production = document.createElement("input")
                name_op_production.classList.add("Nome_operador_producao")
                name_op_production.type= "text"
                name_op_production.value = name.toUpperCase()
                name_op_production.readOnly = true
                new_frame_op.appendChild(name_op_production)
                                                                             //criação de inputs com nomes de operadores

                let function_op = document.createElement("input")
                function_op.type = "text"
                function_op.value = "Operador de Insumos"
                function_op.readOnly = true
                new_frame_op.appendChild(function_op)   
                                                                            //criação de inputs com a função de operadores

                let frame_tasks = document.createElement("div")
                frame_tasks.classList.add("tarefas_direcionadas")
                frame_tasks.style.display = "block"
                new_frame_op.appendChild(frame_tasks)

                
                                                                            //criação do quadro de tarefas
                data.forEach(tasks => {
                    if(tasks.nome_operador === name){
                        let list_task = document.createElement("p")
                        list_task.classList.add("tarefa_direcionada")
                        let row_limit = document.createElement("hr")

                        row_limit.style.display = "block"
                        list_task.style.display = "block"
                        list_task.innerText = tasks.title
                        frame_tasks.appendChild(list_task)
                        frame_tasks.appendChild(row_limit)

                    }
                })
                                                                            //inserção de tarefas nos quadros criados
                tarefas_definidas.appendChild(new_frame_op)
            })


                                                                    /*acima, o algoritmo pega o JSON retornado do back com as tarefas, pega os nomes dos operadores e salva em uma lista que servirá para filtrar as tarefas associadas a cada nome de operadores. Com isso ele cria um quadro para cada operador enviado e as tarefas associadas a ele exibindo de modo correto no front end. */


       })
       .catch(error => {
           console.error("Erro ao buscar dados:", error);
       })
                                                                    /*acima temos o evento de direcionamento aleatório. Isso significa que o proprio sistema vai atribuir tarefas disponiveis para os operadores, as tarefas viram no fetch API */
       
        confirmation_redirection.style.display = "flex"
        task_for_direction.style.display = "none"
        confirmation_direction.style.display = "none"
        operators.style.display = "none"
        refresh_task.style.display = "grid"
        confirmation_random_direction.display = "grid"

    })

    let last_sorted = []

        refresh_task.addEventListener("click",function(){
        tarefas_definidas.innerHTML = ""
        
        menu_production.style.display = "none" 
        buttons_menu.style.display = "none" 
        interface_confirmation.style.display = "flex" 
        interface_confirmation.innerHTML = `Realizando novo direcionamento!`

            console.log("mensagem de sucesso. tarefas redirecionadas")

        
        fetch("/production_menu_random_direct",{
            method: "POST",
            headers: {
               "Content-Type": "application/json"
           },
                body: JSON.stringify({refresh: true })

            })
            .then(response => response.json())
            .then(data =>{ 
                last_sorted = data
                console.log("tarefas reenviadas pelo servidor:",data)
                let operator_name_task = []
                 
                data.forEach(task => {
                if(!operator_name_task.includes(task.nome_operador)) {
                    operator_name_task.push(task.nome_operador)
                }
            })
            console.log(operator_name_task)

                console.log(operator_name_task)

                operator_name_task.forEach(name =>{
                let new_frame_op = document.createElement("div")
                new_frame_op.classList.add("direcionamento_aleatorio_de_operadores")
                new_frame_op.style.display="block"
                                                                            //criação de quadro para operadores
                let name_op_production = document.createElement("input")
                name_op_production.classList.add("Nome_operador_producao")
                name_op_production.type= "text"
                name_op_production.value = name.toUpperCase()
                name_op_production.readOnly = true
                new_frame_op.appendChild(name_op_production)
                                                                             //criação de inputs com nomes de operadores

                let function_op = document.createElement("input")
                function_op.type = "text"
                function_op.value = "Operador de Insumos"
                function_op.readOnly = true
                new_frame_op.appendChild(function_op)   
                                                                            //criação de inputs com a função de operadores

                let frame_tasks = document.createElement("div")
                frame_tasks.classList.add("tarefas_direcionadas")
                frame_tasks.style.display = "block"
                new_frame_op.appendChild(frame_tasks)

                
                                                                            //criação do quadro de tarefas
                data.forEach(tasks => {
                    if(tasks.nome_operador === name){
                        let list_task = document.createElement("p")
                        list_task.classList.add("tarefa_direcionada")
                        let row_limit = document.createElement("hr")

                        row_limit.style.display = "block"
                        list_task.style.display = "block"
                        list_task.innerText = tasks.title
                        frame_tasks.appendChild(list_task)
                        frame_tasks.appendChild(row_limit)

                    }
                })
                                                                            //inserção de tarefas nos quadros criados
                tarefas_definidas.appendChild(new_frame_op)
            })


                setTimeout(function(){
                     menu_production.style.display = "grid" 
                     buttons_menu.style.display = "none" 
                     interface_confirmation.style.display = "none" 
                     console.log("Menu principal reativado") 
                    },3000) 
                })
             })
     

       

                                                                        //acima temos o direcionamento aleatório das tarefas, aonde o proprio sistema escolhe quem faz o que das atividades criadas. Aonde ao ser escolhida essa opção, o sistema: libera a interface, faz conexão com o banco de dados, consultando as tarefas que foram criadas e associa de modo aleatório aos operadores

    confirmation_random_direction.addEventListener("click",function(){

        fetch("/production_menu_random_direct",{
            method: "POST",
            headers: {
               "Content-Type": "application/json"
           },
                body: JSON.stringify({
                    confirm_production: true,
                    data: last_sorted
                })

            })
            .then(response => response.json())
            .then(msg =>{
                console.log("confirmação do servidor:", msg)

            })

        setTimeout(function(){
            menu_production.style.display = "none"
            buttons_menu.style.display = "grid"  
            interface_confirmation.style.display = "none"
            console.log("Menu principal reativado")
        },3000)
            menu_production.style.display = "none"
            buttons_menu.style.display = "none"  
            interface_confirmation.style.display = "flex"
            document.getElementById("text_confirmation").innerText = "TAREFAS DIRECIONADAS!"
        })




    specific_direction.addEventListener("click",function(){
        random_direction.style.opacity = 0.5
        specific_direction.style.opacity = 1
//        confirmation_redirection.style.display = "none"
        task_for_direction.style.display = "grid"
//        tarefas_definidas.style.display = "none"
//        operators.style.display = "flex"
//        confirmation_direction.style.display = "grid"

//    fetch("/production_menu_specific_direction",{
//            method: "POST",
//            headers: {
//                "Content-type": "application/json"
//            },
//            body: JSON.stringify()
//        })
//        .then(response => response.json())
//        .then(data_specific =>{
//            console.log("confirmação de tarefas do servidor:", data_specific)
//
//            data_specific.forEach(task_specific =>{
//                let table_structure = document.createElement("table")
//                table_structure.style.display = "block"
//                let table_title_task = document.createElement("thead")
//                let
//                let table_data_task = document.createElement("tdata")
//                                                                                /*acima o algoritmo recebe o JSON das tarefas que deve ser direcionadas e cria dinamicamente os elementos necessários para exibir, começando pela tabela */
//
//                table_structure.classList.add("tabela_de_tarefa")
//                table_title_task.classList.add("titulo_tarefa")
//
//
//
//            })
//
//        })
    })
 
//    confirmation_button_direction.addEventListener("click", function(){
//        setTimeout(function(){
//            menu_production.style.display = "none"
//            buttons_menu.style.display = "grid"  
//            interface_confirmation.style.display = "none"
//            console.log("Menu principal reativado")
//        },3000)
//            menu_production.style.display = "none"
//            buttons_menu.style.display = "none"  
//            interface_confirmation.style.display = "flex"
//            text_confirmation.innerText = "TAREFAS DIRECIONADAS"
//            console.log("mensagem de sucesso. tarefas direcionadas")
//        })
//
//                                                                        //acima temos o direcionamento especifico, aonde o próprio gestor direciona ao seu modo as tarefas.
}
//==========================================================================================================================

function map(){
    let buttons_menu = document.getElementById("buttons_menu")
    let map_button = document.getElementById ("map_button")
    let map_menu = document.getElementById("map_menu")
    let header_map = document.querySelector(".cabeçalho_menu_mapa")
    const close_window_icon = document.querySelectorAll(".fechar_janela")


    let frame_operation_production = document.querySelector(".quadros_de_operadores_em_producao")
    //let infor_operator_01 = document.querySelector(".operador01")
    let title_task = document.querySelector(".tarefa_titulo")
    let tasks_in_production_description = document.querySelector(".descricao_tarefa")

    
    let button_redirection_task = document.getElementById("redirection_this_task")
    let options_reatribued = document.getElementById("options_reatribued")
    let button_complete_task = document.getElementById("complete_this_task")
    let confirm_realocation = document.getElementById("confirm_realocation")
    
    let menssage_sucess_task = document.querySelector (".mensagem_de_sucesso")
    let text_confirmation = document.getElementById("text_confirmation")
                                                                    //acima temos as variaveis que são referentes ao menu mapa, que serve para acompanhar as tarefas sendo realizadas pelos operadores.

        const container = document.createElement('div');
        container.classList.add('container_frames');
        container.style.display = "grid"
        container.style.gridTemplateColumns = "30em 30em 30em";
        map_menu.appendChild(container);
                                         

     close_window_icon.forEach(element => {
        element.addEventListener("click", function(){  
            map_menu.style.display = "none";
            buttons_menu.style.display = "grid";
            container.innerHTML = ""
        })
    });
                                                                    //acima temos o evento de click do icone de fechar a janela/menu mapa.
    map_button.addEventListener("click", function(){
        buttons_menu.style.display = "none"
        map_menu.style.display = "grid"
        history.replaceState({},"","/map_menu")

                                                                    //acima temos a interação do menu MAPA. Ao ser clicado ele esconde os botões de outros menus, renomeia a URL do sistema, cria de modo dinamico um grande conteiner para criar os quadro dos operadores.
        fetch("/map_menu",{
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({})

       })
       .then(response => response.json())
       .then(data_for_map =>{
            console.log(data_for_map)

            let operator_frame = []

            data_for_map.forEach(name_map => {
                if(!operator_frame.includes(name_map.name_operator)){
                    operator_frame.push(name_map.name_operator)
                }
            });
            console.log(operator_frame)
                                                                    //acima quando o menu MAPA é aberto, automaticamente ele solicita ao back-end um JSON, com as informações dos operadores que receberam as tarefas e quais são as tarefas. Ele cria uma lista com cada nome, e a partir disso ele saberá qual será a quantidade
        function getRandomColor(){
                    const r = Math.floor(Math.random()*256)
                    const g = Math.floor(Math.random()*256)
                    const b = Math.floor(Math.random()*256)

                    return `rgba(${r}, ${b}, ${b}, 0.6)`
                }

            operator_frame.forEach(frame =>{
                let operator_frame_map_tasks = document.createElement("div")
                operator_frame_map_tasks.classList.add("quadros_de_operadores_em_producao")
                operator_frame_map_tasks.style.display = "flex"
                operator_frame_map_tasks.style.boxShadow = `10px 15px 10px ${getRandomColor()}`

            //acima temos a criação do quadro maior de cada operador e a função de criação da cor da borda

                let operator_infos = document.createElement("div")
                operator_infos.classList.add("operador01")
                operator_infos.style.display = "grid"
                operator_infos.style.color = "red"
                operator_frame_map_tasks.appendChild(operator_infos)

                let title_name_operator = document.createElement("input")
                title_name_operator.classList.add("nome_operador01")
                title_name_operator.type= "text"
                title_name_operator.value = frame.toUpperCase()
                operator_frame_map_tasks.appendChild(title_name_operator)

            // acima temos o input criado, com o nome do operador

                let execution_operator = document.createElement("input")
                execution_operator.classList.add("funcao_operador01")
                execution_operator.type = "text"
                execution_operator.value = "operador de insumos".toUpperCase()
                execution_operator.readOnly = true
                operator_frame_map_tasks.appendChild(execution_operator)

            // acima temos a criação do input com a função do operador, valor fixo

                let frame_of_tasks_this_operator = document.createElement("div")
                frame_of_tasks_this_operator.classList.add("tarefas_associadas")
                frame_of_tasks_this_operator.style.display = "flex"
                operator_frame_map_tasks.appendChild(frame_of_tasks_this_operator)

            //acima temos o quadro aonde será exibido o titulo e a tarefa
                let title_div = document.createElement("h2")
                title_div.innerText = "TAREFAS:"
                frame_of_tasks_this_operator.appendChild(title_div)

            

               data_for_map.forEach(task => {
                if (task.name_operator === frame) {  
                    let title_task = document.createElement("div")
                    title_task.classList.add("tarefa_titulo")
                    title_task.innerText = task.title_activity
                    frame_of_tasks_this_operator.appendChild(title_task)

                    let tasks_in_production_description = document.createElement("div")
                    tasks_in_production_description.classList.add("descricao_tarefa")
                    tasks_in_production_description.style.display = "none"
                    tasks_in_production_description.innerText = task.description_activity
                    tasks_in_production_description.style.fontSize = "1.2em"

                    frame_of_tasks_this_operator.appendChild(tasks_in_production_description)
                    
                        let options_in_map = document.createElement("div")
                        let line_options_in_map = document.createElement("hr")
                        tasks_in_production_description.appendChild(options_in_map);

                        options_in_map.classList.add("opcoes_em_mapa")
                        options_in_map.appendChild(line_options_in_map)

                        let button_pause_task = document.createElement("input")
                        button_pause_task.type = "button"
                        button_pause_task.value = "PAUSAR"
                        button_pause_task.classList.add("pause_task")
                        options_in_map.appendChild(button_pause_task)


                        let button_redirection_task = document.createElement("input")
                        button_redirection_task.type = "button"
                        button_redirection_task.value = "REALOCAR"
                        button_redirection_task.classList.add("redirection_this_task")
                        options_in_map.appendChild(button_redirection_task)

                        let complete_this_task = document.createElement("input")
                        complete_this_task.type = "button"
                        complete_this_task.value = "CONCLUIR"
                        complete_this_task.classList.add("complete_this_task")
                        options_in_map.appendChild(complete_this_task)

                        if (task.status_activity === "pendente"){
                            tasks_in_production_description.style.opacity = 0.5
                            title_task.style.opacity = 0.5

                            button_pause_task.value = "CONTINUAR"

                            complete_this_task.style.opacity = 0.5;
                            complete_this_task.disabled = true;
                                
                            button_redirection_task.style.opacity = 0.5;
                            button_redirection_task.disabled = true;
                        }
                                                                    //acima a condição vai depender do status no banco de dados, se vier com status pendente ele deixará o titulo e a descrição com opacidade em 50% e as opções desativadas até que a atividade seja despausada

                                                                    
                    
                    title_task.addEventListener("click", function(){
                      if (tasks_in_production_description.style.display === "none") {
                        tasks_in_production_description.style.display = "flex";
                    } else {
                        tasks_in_production_description.style.display = "none";
                    }
                })
                
                                                                    //acima temos o evento de click que aciona a descrição da tarefa que é exibida pelo titulo. Ou seja, ao clicar no titulo, o usuário poderar ver a descrição mais detalhada da tarefa e com outro clique ele poderá fechar a descrição da tarefa, juntamente com as opções do sistema, que é para concluir pausar ou redirecionar tarefas.

                
                            button_pause_task.addEventListener("click", function() {
                                if (button_pause_task.value === "PAUSAR") {
                                    button_pause_task.value = "CONTINUAR";
                                    
                                    tasks_in_production_description.style.opacity = 0.5
                                    title_task.style.opacity = 0.5

                                    complete_this_task.style.opacity = 0.5;
                                    complete_this_task.disabled = true;
                                
                                    button_redirection_task.style.opacity = 0.5;
                                    button_redirection_task.disabled = true;

                                    
                                    fetch("/map_menu",{
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                            body: JSON.stringify({
                                                button_pause_clicked: true,
                                                activity_id: task.activity_id
                                            })

                                        })
                                            .then(response => response.json())
                                            .then(msg =>{
                                                console.log("mensagem do servidor:", msg)
                                    })  

                                                                        //acima o fetch é para quando o gestor precisa pausar a tarefa, isso fará com que a tarefa entre em modo pendente no banco de dados, para o relatório de turnos

                                } else {
                                    button_pause_task.value = "PAUSAR";
                                
                                    complete_this_task.style.opacity = 1;
                                    complete_this_task.disabled = false;
                                
                                    button_redirection_task.style.opacity = 1;
                                    button_redirection_task.disabled = false;

                                    tasks_in_production_description.style.opacity = 1
                                    title_task.style.opacity = 1

                                    fetch("/map_menu",{
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                            body: JSON.stringify({
                                                button_pause_clicked: false,
                                                activity_id: task.activity_id
                                            })

                                        })
                                            .then(response => response.json())
                                            .then(msg =>{
                                                console.log("mensagem do servidor:", msg)
                                    })  

                                }
                            });
                                                                    //acima temos o evento de pausar e continuar uma tarefa (com um clique), aonde o sistema fará a comunicação com o banco de dados caso a tarefa seja pausada e continuada em seguida, mudando o status para Em andamento.   
                        
                        button_redirection_task.addEventListener("click",function(){
                            const isVisible = options_reatribued.style.display === "grid";
                                    complete_this_task.style.opacity = 0.5;
                                    complete_this_task.disabled = true;
                                    
                                    button_pause_task.style.opacity = 0.5;
                                    button_pause_task.disabled = true;

                        
                                if (!isVisible) {
                                    options_reatribued.style.display = "grid";
                                    
                                    operator_frame.forEach(name_option_reatribuited => {
                                        let options_operator = document.createElement("input")
                                        options_operator.type = "radio"
                                        options_operator.name = "options_operator"
                                        options_operator.value = name_option_reatribuited.toUpperCase()
                                        

                                        let label = document.createElement("label")
                                        label.textContent = name_option_reatribuited
                                        label.prepend(options_operator)
                                        label.style.display = "flex"
                                        options_reatribued.appendChild(label);

                                                                    //criação dinamica de inputs radio com os nomes dos operadores que devem receber novas tarefas.

                                    })

                                    
                                        confirm_realocation.addEventListener("click",function(){
                                                map_menu.style.display = "none";
                                                menssage_sucess_task.style.display = "flex";
                                                text_confirmation.textContent = "Tarefa realocada!"
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

                                } else {
                                    options_reatribued.style.display = "none";
                                
                                    complete_this_task.style.opacity = 1;
                                    complete_this_task.disabled = false;
                                
                                    button_pause_task.style.opacity = 1;
                                    button_pause_task.disabled = false;
                                }
                            });
                                                                    //acima temos o evento de realocar uma tarefa ou cancelar a realocação (com um duplo clique), aonde o sistema fará a comunicação com o banco de dados caso a tarefa seja realocada.

  
                        
                    complete_this_task.addEventListener("click", function () {
                    // Oculta o menu e exibe a mensagem de sucesso imediatamente
                            map_menu.style.display = "none";
                            tasks_in_production_description.remove();
                            title_task.remove(); 
                            menssage_sucess_task.style.display = "flex";
                            text_confirmation.textContent = "Tarefa concluída!"

                                                                    //acima o evento de clique no botão concluir nas tarefas, faz com que uma mensagem de sucesso seja ativada e remove da tela ou do quadro a tarefa em questão.
                            fetch("/map_menu",{
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                            body: JSON.stringify({
                                                button_complete_clicked: true,
                                                activity_id: task.activity_id
                                            })

                                        })
                                            .then(response => response.json())
                                            .then(msg =>{
                                                console.log("mensagem do servidor:", msg)
                                    })  
                          
                    console.log("Mensagem de sucesso exibida, tarefa retirada de operação. Menu do mapa ocultado.");

                                                                    //acima o fetch capta o id da tarefa e o botão concluir clicado, com essas informações ele envia ao back end e o back atualiza o status no banco de dados.
                    
                    // Após 3 segundos, oculta a mensagem e exibe o menu novamente
                    setTimeout(function () {
                        menssage_sucess_task.style.display = "none";
                        map_menu.style.display = "grid"; // ou "block", dependendo do layout do seu menu
                        console.log("Menu do mapa reativado.");
                    }, 3000);
                });

            }
        })
        container.appendChild(operator_frame_map_tasks)
    })
})          
                                                                    //acima o algoritmo percorre pelo JSON, verifica cada atividade e compara a qual operador ela está associada. Para cada atividade associada ele cria uma div com o titulo para ser clicado, com isso ele pode mostra a descrição dela.           
            
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
