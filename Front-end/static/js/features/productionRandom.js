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
    }