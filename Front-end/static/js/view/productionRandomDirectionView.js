import { confirmationRandomDirection } from "../features/productionRandom.js"

export function renderOperators(data){
let confirm_direction = document.querySelector(".confirmacao_redirecionamento")
let tarefas_definidas = document.querySelector(".tarefas_definidas")
tarefas_definidas.innerHTML = ""


let operation_data = []


    for (const tasks of Object.keys(data)) {
        const task = data[tasks]
        
        let operator = operation_data.find(op => op.id_op === task.operator.id_op)

        if(!operator){
            operator = {...task.operator, tasks: [] }
           operation_data.push(operator);
        }

        operator.tasks.push({
            id: task.task.id_task,
            description: task.task.description
        })
    }

    operation_data.forEach(definition_direction =>{
        let new_frame_op = document.createElement("div")
            new_frame_op.classList.add("direcionamento_aleatorio_de_operadores")
            new_frame_op.style.display="block"

        let name_op_production = document.createElement("input")
                name_op_production.classList.add("Nome_operador_producao")
                name_op_production.classList.add("keep-value"); 
                name_op_production.type= "text"
                name_op_production.value = definition_direction.ops_name
                name_op_production.readOnly = true
                new_frame_op.appendChild(name_op_production)

         let function_op = document.createElement("input")
                function_op.type = "text"
                function_op.value = "Operador de Insumos"
                function_op.readOnly = true
                function_op.classList.add("keep-value"); 
                new_frame_op.appendChild(function_op)   


         let frame_tasks = document.createElement("div")
                frame_tasks.classList.add("tarefas_direcionadas")
                frame_tasks.style.display = "block"
                new_frame_op.appendChild(frame_tasks)
                 
                    definition_direction.tasks.forEach(separete_tasks =>{
                        let list_task = document.createElement("p")
                            list_task.classList.add("tarefa_direcionada")

                        let row_limit = document.createElement("hr")
                                row_limit.style.display = "block"
                                list_task.style.display = "block"
                                list_task.innerText = separete_tasks.description
                            frame_tasks.appendChild(list_task)
                            frame_tasks.appendChild(row_limit)

                        })



         tarefas_definidas.appendChild(new_frame_op)
                
     
    })
     
confirmationRandomDirectionView()

}

export function confirmationRandomDirectionView(){
let confirm_directionBtn = document.getElementById("confirmation_random_direction")

    confirm_directionBtn.addEventListener("click", function(){
        let confirm_production = true
            if (confirm_production){
                const response = confirmationRandomDirection()
            }
        })
}
  
