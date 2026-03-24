import { featureDirectionTask } from "../features/productionSpecific.js"
import {show_confirmation_menssage} from "../features/confirmMenssage.js"

    export async function renderSpecificTasks(data) {
    let containerNameOps = document.getElementById("operators_in_work")
    const containerTable = document.querySelector(".tarefa_para_direcionamento")
    const containerDirection = document.querySelector(".direcionamento_por_operador")
    const containerConfirmation = document.querySelector(".confirmacao_direcionamento")
    const confirmation_button_direction = document.getElementById("confirmation_button_direction")


    function createTable(task){
    containerTable.innerHTML = ""
    const table = document.createElement("table")
    table.classList.add("tabela_de_tarefa")
    table.id = "tableTaskSpecificDirection"

        // linha de título
        const trTitle = document.createElement("tr")

        const thTitleTask = document.createElement("th")
        thTitleTask.classList.add("titulo_tarefa")
        thTitleTask.textContent = task.title

        const thImportance = document.createElement("th")
        thImportance.classList.add("titulo_importancia")
        thImportance.textContent = "IMPORTÂNCIA"

        trTitle.appendChild(thTitleTask)
        trTitle.appendChild(thImportance)


    // linha de descrição
        const trDescription = document.createElement("tr")

        const tdDescription = document.createElement("td")
        tdDescription.id = "text_description_task_table"
        tdDescription.textContent = task.description_task

        const tdImportance = document.createElement("td")
        tdImportance.textContent = task.importance

        trDescription.appendChild(tdDescription)
        trDescription.appendChild(tdImportance)

        table.appendChild(trTitle)
        table.appendChild(trDescription)

        containerTable.appendChild(table)
        console.log("Criando tabela", task)
        containerDirection.appendChild(containerTable)
        containerConfirmation.style.display = "block"
        containerNameOps.style.display = "block"
        containerDirection.style.display = "block"

                                                            //função de criação dinamica da tabela de tarefas retornadas do backend.
    }

    let tasksBackend = []

        data.forEach(dt => {
            console.log("operadores:",dt.ops)

            dt.ops.forEach(obj => {
                console.log("dados dos operadores:", obj.name_op)
                containerNameOps.append(obj.name_op)

                
                const checkBox = document.createElement("input")
                checkBox.type = "checkbox"
                checkBox.classList.add("selecao_operador")
                checkBox.dataset.id = obj.id_op

                containerNameOps.appendChild(checkBox)

                                                                            //loop acima pega os dados dos operadores e adiciona eles a tela para fazer o direcionamento especifico das tarefas.
            })


            dt.tasks.forEach(task =>{
            tasksBackend.push(task)
            })
        });

        let currentTaskIndex = 0;
        createTable(tasksBackend[currentTaskIndex])

        confirmation_button_direction.addEventListener("click", function(){
            show_confirmation_menssage("Tarefa direcionada!", 3000, menu_production)
            const checkBox = document.querySelectorAll(".selecao_operador")
            const selectedOps = []

                checkBox.forEach(cb => {
                    if(cb.checked){
                        selectedOps.push(cb.dataset.id)
                    }
                })

                if(selectedOps.length === 0){
                    alert("Selecione pelo menos um operador!")
                    return
                }

                // ✅ payload correto (ARRAY)
                const payload = selectedOps.map(opId => ({
                    operator_id: opId,
                    task_id: tasksBackend[currentTaskIndex].id_task
                }))

                console.log("Payload enviado:", payload)

                // ✅ chama UMA vez só
                featureDirectionTask(payload)
            // avança para a próxima task
            currentTaskIndex++
            if(currentTaskIndex < tasksBackend.length){
                createTable(tasksBackend[currentTaskIndex])
            } else {
                alert("Todas as tasks foram direcionadas!")
                containerTable.innerHTML = ""
                containerNameOps.innerHTML = ""
                containerConfirmation.style.display = "none"
            }
 
        })
        
    }   


