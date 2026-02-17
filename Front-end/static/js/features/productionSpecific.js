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
                    title_task_table.textContent = wi.title
                    text_description_task_table.dataset.id = wi.id
                    text_description_task_table.textContent = wi.description
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
