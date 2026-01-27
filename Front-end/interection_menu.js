const API_BASE_URL =
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:5000"
    : "https://optiturn.onrender.com";


function show_confirmation_menssage(text, time = 3000, menu_in_production) {
    const msgBox = document.getElementById('msgSucess');
    const msgTexto = document.getElementById('text_confirmation');
    const inputs = document.querySelectorAll("input")
    let buttons_menu = document.getElementById("buttons_menu")

    msgTexto.textContent = text;
    msgBox.style.display = 'flex'; 

    menu_in_production.style.display = "none"
    msgBox.style.opacity = 0

    setTimeout(() => {
        msgBox.style.transition = 'opacity 0.5s';
        msgBox.style.opacity = 1;
        
        inputs.forEach(input => {

            if (input.classList.contains("keep-value")) return;

            if (input.type === "checkbox" || input.type === "radio") {
                input.checked = false;
            } else if (
                input.type !== "button" &&
                input.type !== "submit" &&
                input.type !== "reset"
            ) {
                input.value = "";
            }
        });

    }, 10);

                                                                    //acima o algoritmo pega o id da mensagem de sucesso, o id do icone e o parametro do menu que deve ser escondido; Em seguida faz com que o menu receba uma leve transição fade-in, retorna ao menu mas limpando os botões, se um input for checkbox ou radio ou textos e senhas ele desmarca e limpa, mas se for um input de botão como cadastrar ele mantém o valor. 
    setTimeout(() => {
            msgBox.style.opacity = 0;
            setTimeout(() => {
                msgBox.style.display = 'none';
                buttons_menu.style.display = 'grid'; // volta o menu principal
                menu_in_production.style.display = 'none'; // volta o menu
            }, 500); // espera o fade-out
        }, time);
}

function close_windows (id, menu_in_production){
    const window_to_close = document.getElementById(id)

    if (window_to_close){
        window_to_close.querySelector(".fechar_janela").addEventListener("click", function(){
            window_to_close.style.display = "none"; 
            history.replaceState({},"","/main")
            buttons_menu.style.display = "grid";
            menu_in_production.style.display = "none"
        });
    }
}


function login(){

    const login_user = document.getElementById("loginForm")

    login_user.addEventListener("submit",async (ev) => {
        ev.preventDefault()

        const username = document.getElementById("username").value 
        const password = document.getElementById("password").value

        const response = await fetch(`${API_BASE_URL}/login`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            credentials: "include" 
        })
            if(response.ok){
                window.location.href = 'main.html';
            }else{
                alert("Erro: Credenciais de acesso inválidas")
            }
    })
                                                                            //acima temos a função que capta o login por meio de API.
}

//==========================================================================================================================


function open_menu(id_btn,id_menu, displayType = "grid", url){
    const button_menu = document.getElementById(id_btn)
    const menu_in_work = document.getElementById(id_menu)
    const main_menu = document.getElementById("buttons_menu")


    button_menu.addEventListener("click",function(){
        menu_in_work.style.display = displayType
        main_menu.style.display = "none"
         if (url) {
            history.replaceState({}, "", url)
        }
    })

}

function open_inner_option(id_btn,id_menu, displayType = "grid", group_class = "inner_menu"){
    const button_menu = document.getElementById(id_btn)
    const menu_in_work = document.getElementById(id_menu)

    button_menu.addEventListener("click",function(){
        document.querySelectorAll(`.${group_class}`).forEach(all =>{
            all.style.display = "none"
        })

        menu_in_work.style.display = displayType
    })
}



async function update_UI(){
    try{
        const response = await fetch(`${API_BASE_URL}/main`,{
            method: "POST",
            credentials: "include"
        });
           
        
        if (!response.ok) throw new Error("Falha ao carregar dados")
        
        const data = await response.json()

        let name_gestor = document.getElementById("name_gestor_interface")
        let turn_gestor = document.getElementById("turn_gestor_interface")

        name_gestor.textContent = data.name
        turn_gestor.textContent = data.turn
        console.log(data)

    }catch (err) {
        console.error("Erro ao atualizar UI:", err);
    }

}                                                           

                                                                        //acima temos a função de atualização da interface, ou seja, ao logar ela será a responsável por mostrar o nome e o turno do gestor, assim como os icones presentes na página



function register_user(){
    let option_register01 = document.getElementById("opt_register_worker01")   
    let opt_register02 = document.getElementById("opt_register_worker02") 
    let confirmation_register_button = document.getElementById("confirmation_button")

                                                                                        /*acima temos as variaveis que armazenam as classes e IDs do elementos HTML referentes ao menu de registros */
    close_windows("menu_register", menu_register)
    open_menu("register_button","menu_register", "grid", "/register_user")
    open_inner_option("opt_register_worker01", "register_leader", "flex")
    open_inner_option("opt_register_worker02", "register_operator", "flex")


                                                                                    /* acima temos a mudança da url ao entrar no menu e a captura dos valores quando o botão de "cadastrar" é clicado.*/
        
        confirmation_register_button.addEventListener("click", function(){
            if( option_register01.checked){
                const name = document.getElementById("name_new_user").value
                const user = document.getElementById("user_gestor").value
                const turn = document.getElementById("shift_gestor").value
                const password= document.getElementById("password_gestor").value

                fetch(`${API_BASE_URL}/register_gestor` ,{
                    method:"POST",
                    headers:{
                        'Content-type': 'application/json',
                    },
                    credentials: "include",
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

                    show_confirmation_menssage("Cadastro realizado com sucesso!", time=3000,menu_register)
                                                                            /*acima temos a conexão com o backend, ele pega as informações que estão no front e foram capturadas pelas variaveis que armazena os inputs, cria um arquivo JSON, e envia para o back end para a rota do gestor */

            }else if(opt_register02.checked){
                const name_operator = document.getElementById("name_new_operator").value
                const fixed_op = document.getElementById("fixed_operator").checked
                const temp_op = document.getElementById("temporary_operator").checked

                fetch(`${API_BASE_URL}/register_operator`,{
                    method: "POST",
                    headers:{
                        'content-type': 'application/json',
                    },
                    credentials: "include",
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
                show_confirmation_menssage("Cadastro realizado com sucesso!", time=3000,menu_register)
        
            } 
           
                                                                                 /* acima temos a animação mais básica para o evento de confirmação! */
                                                                                
    
        })
}

                                                                                  

//==========================================================================================================================


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


//==========================================================================================================================


function production(){
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

    let last_sorted = [] 

                                                                                //acima temos as referencias de elementos html que foram armazenados em variaveis;
    close_windows("menu_production",menu_production )
    open_menu("production_button","menu_production","grid","/production_menu")



   random_direction.addEventListener("click", function(){
        tarefas_definidas.style.display = "grid"
        random_direction.style.opacity = 1
        specific_direction.style.opacity = 0.5
        history.replaceState({},"","/production_menu/random_direction")

       fetch(`${API_BASE_URL}/production_menu_random_direct`,{
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
            credentials: "include",
            body: JSON.stringify({ refresh: false, confirm_production: false })


       })
       .then(response => response.json())
       .then(data =>{
           console.log("tarefas enviadas pelo servidor:", data)
           last_sorted = data 

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
                name_op_production.classList.add("keep-value"); 
                name_op_production.type= "text"
                name_op_production.value = name.toUpperCase()
                name_op_production.readOnly = true
                new_frame_op.appendChild(name_op_production)
                                                                             //criação de inputs com nomes de operadores

                let function_op = document.createElement("input")
                function_op.type = "text"
                function_op.value = "Operador de Insumos"
                function_op.readOnly = true
                function_op.classList.add("keep-value"); 
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



        refresh_task.addEventListener("click",function(){
        tarefas_definidas.innerHTML = ""
        last_sorted = [] 
        
        menu_production.style.display = "none" 
        buttons_menu.style.display = "none" 

        show_confirmation_menssage("REALIZANDO NOVO DIRECIONAMENTO!", time=3000,menu_production)

            console.log("mensagem de sucesso. tarefas redirecionadas")

        
        fetch(`${API_BASE_URL}/production_menu_random_direct`,{
            method: "POST",
            headers: {
               "Content-Type": "application/json"
           },
                credentials: "include",
                body: JSON.stringify({refresh: true })

            })
            .then(response => response.json())
            .then(data =>{ 
                last_sorted = data //<==== aqui é o refresh salvo
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

        fetch(`${API_BASE_URL}/production_menu_random_direct`,{
            method: "POST",
            headers: {
               "Content-Type": "application/json"
           },
                credentials: "include",
                body: JSON.stringify({
                    confirm_production: true,
                    data_task: last_sorted
                })

            })
            .then(response => response.json())
            .then(msg =>{
                console.log("confirmação do servidor:", msg)

                show_confirmation_menssage("TAREFA DIRECIONADA!", time=3000,menu_production)
            })

            
            
        })



//================================================================================================================================================
    specific_direction.addEventListener("click",function(){
        random_direction.style.opacity = 0.5
        specific_direction.style.opacity = 1
        confirmation_redirection.style.display = "none"
        task_for_direction.style.display = "grid"
        tarefas_definidas.style.display = "none"
        operators.style.display = "flex"
        confirmation_direction.style.display = "grid"
        operators_in_work_div = document.getElementById("operators_in_work")
        text_description_task_table = document.getElementById("text_description_task_table")
        title_task_table = document.getElementById("title_task_table")
        

    fetch(`${API_BASE_URL}/production_menu_specific_direction`,{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify()
        })
        .then(response => response.json())
        .then(data_specific =>{
            console.log("confirmação de tarefas do servidor:", data_specific)
            operators_in_work = data_specific[1]
            work_instruction = data_specific[0]
            console.log("operadores disponiveis:", operators_in_work)
            console.log("Tarefas para direcionamento:", work_instruction)
            
                                                                        /*acima o algoritmo recebe dois arrays, um com as tarefas criadas e outro com os operadores cadastrados. Ao receber os arrays ele pega o array dos operadores e guarda na variavel operators_in_work*/


                work_instruction.forEach(wi=>{
                    title_task_table.dataset.id = wi.id
                    title_task_table.append(wi.title)
                    text_description_task_table.dataset.id = wi.id
                    text_description_task_table.append(wi.description)
                })                                                        

           // ------------------------------------------------------------------------------------------------------------------

                operators_in_work.forEach(ops =>{
                    let checkbox_ops = document.createElement("input")
                    checkbox_ops.type = "checkbox"
                    checkbox_ops.dataset.id = ops.id
                    checkbox_ops.classList.add("selecao_operador")
                    
                    let label_checkbox = document.createElement("label")
                    label_checkbox.innerText = ops.name
                    operators_in_work_div.append(checkbox_ops)
                    operators_in_work_div.append(label_checkbox)

                                                                        /*acima o loop faz o percurso dentro do array, e cria checkbox de acordo com o numero de dados retornados do back-end, cria dinamicamente, adiciona class, e data-id para saber qual foi clicado. */
                })

            

            })

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
            text_confirmation.innerText = "TAREFAS DIRECIONADAS"
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

//==========================================================================================================================


function turn(){
    let button_shift_change = document.getElementById("shift_change")
    let buttons_menu = document.getElementById("buttons_menu")
    let turn_menu = document.getElementById("turn_menu")
    let header_turn = document.querySelector(".cabeçalho_menu_turno")
    const container_table_turn = document.createElement("div")
    let shift_demand = document.getElementById("shift_demand")
    const close_window_icon = document.querySelectorAll(".fechar_janela")

    close_windows("turn_menu",turn_menu )
            
    button_shift_change.addEventListener("click",function(){
        buttons_menu.style.display = "none"
        turn_menu.style.display = "block"
        header_turn.style.display = "grid"
        history.replaceState({},"","/turn_menu")

            container_table_turn.innerHTML = ""

        fetch(`${API_BASE_URL}/turn_menu`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({confirm_demand: false})

       })
       .then(response => response.json())
       .then(data_report_turn =>{
            console.log("dados do relatório de turno:",data_report_turn)

            const container_table = document.createElement("div")
            container_table.classList.add("tabela_relatorio")


            let table_turn_report = document.createElement("table")
            table_turn_report.classList.add("relatorio_de_turno")


            let header = document.createElement("tr")
            let th1 = document.createElement("th")
            let th2 = document.createElement("th")
            let th3 = document.createElement("th")

            th1.textContent = "ATIVIDADE"
            th2.textContent = "DESCRIÇÃO"
            th3.textContent = "STATUS"


            header.appendChild(th1)
            header.appendChild(th2)
            header.appendChild(th3)

            table_turn_report.appendChild(header)

                                                                                        //Acima, quando o botão de passagem de turno é clicado, o sistema abre um fetch e solicita ao back-end que envie os dados do relatório, ao receber esse dados ele mostra no console do navegador e inicia a criação dinamica dos elementos da tabela.
                                                                            
            data_report_turn.forEach(line => {
                let row = document.createElement("tr")

                let row_data_activity = document.createElement("td")

                let row_data_description = document.createElement("td")

                let row_data_status = document.createElement("td")

                row_data_activity.textContent = line.title
                row_data_description.textContent = line.description
                row_data_status.textContent = line.status





                                                                                            //Acima, o algoritmo entra em um loop, que a cada linha no json ele deverá criar a mesma quantidade de linhas na tabela, criando primeiro o cabeçalho dela e logo apos as linhas com titulo descrição e status inserindo os textos retornados do banco de dados.
                row.appendChild(row_data_activity)
                row.appendChild(row_data_description)
                row.appendChild(row_data_status)
                

                table_turn_report.appendChild(row)
            })

            container_table.appendChild(table_turn_report)
            container_table_turn.appendChild(table_turn_report)
            container_table_turn.appendChild(shift_demand)
            turn_menu.appendChild(container_table_turn);

            shift_demand.addEventListener("click",function(){

                fetch(`${API_BASE_URL}/turn_menu`,{
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({confirm_demand : true})
                })

                .then(response => response.json())
                .then(data_back =>{
                    console.log("Resposta do servidors:", data_back)
                    table_turn_report.innerHTML = ""
                    show_confirmation_menssage("TURNO RECEBIDO!", time=3000,turn_menu)
                })
            })


                                                                        //Acima o algoritmo faz a comunicação com o back, informando que pode apagar o que foi concluido, e espera a resposta do que ficou pendente.
        })
    })
}

//==========================================================================================================================


document.addEventListener("DOMContentLoaded", function () {

       if (document.getElementById("loginForm")) {
        login(); // só roda se estiver na página de login
    }
    update_UI();
    register_user();   
    activities();      
    production();
    map();
    turn()
});
