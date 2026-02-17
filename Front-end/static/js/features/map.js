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
    const text_confirmation = document.getElementById("text_confirmation")
                                                                    //acima temos as variaveis que são referentes ao menu mapa, que serve para acompanhar as tarefas sendo realizadas pelos operadores.

        const container = document.createElement('div');
        container.classList.add('container_frames');
        container.style.display = "grid"
        container.style.gridTemplateColumns = "30em 30em 30em";
        container.style.rowGap = "2em"
        map_menu.appendChild(container);
                                         

     close_windows("map_menu",map_menu)
                                                                    //acima temos o evento de click do icone de fechar a janela/menu mapa.
    map_button.addEventListener("click", function(){
        buttons_menu.style.display = "none"
        map_menu.style.display = "grid"
        history.replaceState({},"","/map_menu")
        container.innerHTML = ""
                                                                    //acima temos a interação do menu MAPA. Ao ser clicado ele esconde os botões de outros menus, renomeia a URL do sistema, cria de modo dinamico um grande conteiner para criar os quadro dos operadores.
        fetch(`${API_BASE_URL}/map_menu`,{
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           credentials: "include",
           body: JSON.stringify({})

       })
       .then(response => response.json())
       .then(data_for_map =>{
            console.log("TAREFAS RETORNADAS DO SERVIDOR:",data_for_map)

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
                title_name_operator.classList.add("keep-value"); 
                title_name_operator.type= "text"
                title_name_operator.value = frame.toUpperCase()
                operator_frame_map_tasks.appendChild(title_name_operator)

            // acima temos o input criado, com o nome do operador

                let execution_operator = document.createElement("input")
                execution_operator.classList.add("funcao_operador01")
                execution_operator.classList.add("keep-value"); 
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


                      //  let button_redirection_task = document.createElement("input")
                      //  button_redirection_task.type = "button"
                      //  button_redirection_task.value = "REALOCAR"
                      //  button_redirection_task.classList.add("redirection_this_task")
                      //  options_in_map.appendChild(button_redirection_task)

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
                                
                            //button_redirection_task.style.opacity = 0.5;
                            //button_redirection_task.disabled = true;
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
                                
                                    //button_redirection_task.style.opacity = 0.5;
                                    //button_redirection_task.disabled = true;

                                    
                                    fetch(`${API_BASE_URL}/map_menu`,{
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                            credentials: "include",
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
                                
                                    //button_redirection_task.style.opacity = 1;
                                    //button_redirection_task.disabled = false;

                                    tasks_in_production_description.style.opacity = 1
                                    title_task.style.opacity = 1

                                    fetch(`${API_BASE_URL}/map_menu`,{
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                            credentials: "include",
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
//                        
//                        button_redirection_task.addEventListener("click",function(){
//                            const isVisible = options_reatribued.style.display === "grid";
//                                    complete_this_task.style.opacity = 0.5;
//                                    complete_this_task.disabled = true;
//                                    
//                                    button_pause_task.style.opacity = 0.5;
//                                    button_pause_task.disabled = true;
//
//                                if (!isVisible) {
//                                    options_reatribued.style.display = "grid";
//                                    
//                                     options_reatribued.innerHTML = "";
//
//                                     
//
//                                    operator_frame.forEach(name_option_reatribuited => {
//
//                                        let find_operator_id = data_for_map.find(
//                                            id => id.name_operator.toUpperCase() === name_option_reatribuited.toUpperCase()
//                                        )
//
//                                        if(find_operator_id){
//                                            let options_operator = document.createElement("input")
//                                            options_operator.type = "radio"
//                                            options_operator.name = "options_operator"
//                                            options_operator.value = options_operator.value = find_operator_id.operator_id
//
//                                            
//
//                                            let label = document.createElement("label")
//                                            label.textContent = name_option_reatribuited
//                                            label.prepend(options_operator)
//                                            label.style.display = "flex"
//                                            options_reatribued.appendChild(label);
//
//                                            confirm_realocation.style.display = "grid"
//                                            options_reatribued.appendChild(confirm_realocation)
//                                                                        //criação dinamica de inputs radio com os nomes dos operadores que devem receber novas tarefas.
//
//                                        }else{
//                                            console.warn(`Operador com ID '${name_option_reatribuited}' não encontrado ou não presente nas tarefas desiginadas`)
//                                        }
//                                    })
//
//
//                                        function renderMapMenu(data) {
//                                            map_menu.innerHTML = "";
//
//                                            data.forEach(task => {
//                                               
//                                            });
//                                        }
//
//                                    
//                                        confirm_realocation.addEventListener("click",function(){
//                                                const SelectedOperator = document.querySelector('input[name="options_operator"]:checked')
//
//                                                if (!SelectedOperator){
//                                                    alert("Confirmar operador?");
//                                                    return;
//                                                }
//
//                                                map_menu.style.display = "none";
//                                                menssage_sucess_task.style.display = "flex";
//                                                text_confirmation.textContent = "Tarefa realocada!"
//
//                                                fetch("/map_menu",{
//                                                    method: "POST",
//                                                    headers: {
//                                                        "Content-Type": "application/json"
//                                                    },
//                                                        body: JSON.stringify({
//                                                            button_confirm_realocation_clicked: true,
//                                                            activity_id: task.activity_id,
//                                                            new_operator_for_task_id: SelectedOperator.value
//                                                        })
//
//                                                    })
//                                                        .then(response => response.json())
//                                                        .then(update_map =>{
//                                                            console.log("mensagem do servidor:", update_map)
//                                                            console.log("Mensagem de sucesso exibida. tarefa realocada ao novo operador.");
//
//                                                            renderMapMenu(update_map)
//
//                                                            setTimeout(function () {
//                                                                map_menu.style.display = "grid"; 
//                                                                menssage_sucess_task.style.display = "none";
//                                                                options_reatribued.style.display = "none";
//                                                                button_pause_task.style.opacity = 1
//                                                                complete_this_task.style.opacity = 1;
//
//                                                                console.log("Menu do mapa reativado.");
//                                                                renderMapMenu(update_map)
//                                                                }, 3000);
//
//                                                                                // Após 3 segundos, oculta a mensagem e exibe o menu novamente
//                                                }) 
//                                            })
//                        
//                                                                                //acima temos a interação com botão "REALOCAR", ele tira a tarefa de um operador e entrega a outro operador, o sistema confirma a realocação, mostra uma mensagem de sucesso e volta com o menu.  
//
//                                } else {
//                                    options_reatribued.style.display = "none";
//                                
//                                    complete_this_task.style.opacity = 1;
//                                    complete_this_task.disabled = false;
//                                
//                                    button_pause_task.style.opacity = 1;
//                                    button_pause_task.disabled = false;
//                                }
//                            });
                                                                    //acima temos o evento de realocar uma tarefa ou cancelar a realocação (com um duplo clique), aonde o sistema fará a comunicação com o banco de dados caso a tarefa seja realocada.

  
                        
                    complete_this_task.addEventListener("click", function () {
                    // Oculta o menu e exibe a mensagem de sucesso imediatamente
                            map_menu.style.display = "none";
                            tasks_in_production_description.remove();
                            title_task.remove(); 
                            show_confirmation_menssage("TAREFA CONCLUÍDA!", time=3000,map_menu)
                            container.innerHTML = "";
                                                                    //acima o evento de clique no botão concluir nas tarefas, faz com que uma mensagem de sucesso seja ativada e remove da tela ou do quadro a tarefa em questão.
                            fetch(`${API_BASE_URL}/map_menu`,{
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                            credentials: "include",
                                            body: JSON.stringify({
                                                button_complete_clicked: true,
                                                activity_id: task.activity_id,
                                                title_activity: task.title_activity,
                                                description_activity: task.description_activity,
                                                operator_id: task.operator_id,
                                                name_operator: task.name_operator,
                                                importace: task.importance_activity
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