import { mapService,changeStatusTaskMap } from "../services/mapService.js"
import {show_confirmation_menssage} from "../features/confirmMenssage.js"

const map_button = document.getElementById("map_button")

map_button.addEventListener("click", async () => {

    const data_task = await mapService()

    buildMap(data_task)
    
})

export function buildMap(data){
    let time = 0
    let Array_name = []


// limpar containers antigos
    const oldContainers = map_menu.querySelectorAll('.container_frames');
    oldContainers.forEach(el => el.remove());
 
      const mapContainer = document.createElement('div');
        mapContainer.classList.add('container_frames');
        mapContainer.style.display = "grid"
        mapContainer.style.overflowX = "auto"
        mapContainer.style.gridTemplateColumns = "25em 25em 25em 25em";
        mapContainer.style.rowGap = "2em"
        mapContainer.style.columnGap = "1em"
        map_menu.appendChild(mapContainer)
        

        

    data.forEach(e => {
        if(!Array_name.includes(e.name_Op)){
            Array_name.push(e.name_Op)    
        }
    });
 
    

    Array_name.forEach(frames =>{
     
     //----------------------------------------------------------------------------------------------------\\
     //bloco de criação dos frames dos operadores.   
        let operator_frame_map_tasks = document.createElement("div")
            operator_frame_map_tasks.classList.add("quadros_de_operadores_em_producao")
            operator_frame_map_tasks.style.display = "flex"
            operator_frame_map_tasks.style.boxShadow = `10px 15px 10px ${getRandomColor()}`

                                                    //acima temos a criação do quadro maior de cada operador e //função de criação da cor da borda

        
        let operator_infos = document.createElement("div")
            operator_infos.classList.add("operador01")
            operator_infos.style.display = "grid"
            operator_infos.style.color = "red"
            operator_frame_map_tasks.appendChild(operator_infos)


        let title_name_operator = document.createElement("input")
            title_name_operator.classList.add("nome_operador01")
            title_name_operator.classList.add("keep-value"); 
            title_name_operator.type= "text"
            title_name_operator.value = frames.toUpperCase()
            operator_frame_map_tasks.appendChild(title_name_operator)


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
        
    //-------------------------------------------------------------------------------------------------------\\


    //-------------------------------------------------------------------------------------------------------\\
        //bloco de inserção de tarerfas nos frames devidos
            data.forEach(task => {
                if (task.name_Op === frames) {  
                    let title_task = document.createElement("div")
                    title_task.classList.add("tarefa_titulo")
                    title_task.innerText = task.task_title
                    frame_of_tasks_this_operator.appendChild(title_task)

                    let tasks_in_production_description = document.createElement("div")
                    tasks_in_production_description.classList.add("descricao_tarefa")
                    tasks_in_production_description.style.display = "none"
                    tasks_in_production_description.innerText = task.task_text
                    tasks_in_production_description.style.fontSize = "1.2em"

                    frame_of_tasks_this_operator.appendChild(tasks_in_production_description)

    //-------------------------------------------------------------------------------------------------------\\


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

                        let complete_this_task = document.createElement("input")
                        complete_this_task.type = "button"
                        complete_this_task.value = "CONCLUIR"             
                        complete_this_task.classList.add("complete_this_task")
                        options_in_map.appendChild(complete_this_task)


//-------------------------------------------------------------------------------------------------------\\

//-------------------------------------------------------------------------------------------------------\\
    //bloco de interação com os elementos na página

        if (task.task_status === "pendente"|| "PENDENTE"){
            tasks_in_production_description.style.opacity = 0.5
            title_task.style.opacity = 0.5
            button_pause_task.value = "CONTINUAR"
            complete_this_task.style.opacity = 0.5;
            complete_this_task.disabled = true;
        }

             title_task.addEventListener("click", function(){
                if (tasks_in_production_description.style.display === "none") {
                    tasks_in_production_description.style.display = "flex";
                } else {
                    tasks_in_production_description.style.display = "none";
                }
            })


            button_pause_task.addEventListener("click", function() {
                if (button_pause_task.value === "PAUSAR") {
                        button_pause_task.value = "CONTINUAR";
                                    
                        tasks_in_production_description.style.opacity = 0.5
                        title_task.style.opacity = 0.5

                        complete_this_task.style.opacity = 0.5;
                        complete_this_task.disabled = true;
                }else {
                  button_pause_task.value = "PAUSAR";
              
                  complete_this_task.style.opacity = 1;
                  complete_this_task.disabled = false;
              
                  //button_redirection_task.style.opacity = 1;
                  //button_redirection_task.disabled = false;

                  tasks_in_production_description.style.opacity = 1
                  title_task.style.opacity = 1
            }                  
        },

            complete_this_task.addEventListener("click", function () {
                map_menu.style.display = "none";
                tasks_in_production_description.remove();
                title_task.remove(); 
                show_confirmation_menssage("TAREFA CONCLUÍDA!", time=3000, map_menu)
                mapContainer.innerHTML = "";
                changeStatusTaskMap("CONCLUIDO",task.task_id)
            })
        )

                    mapContainer.appendChild(operator_frame_map_tasks)
            }
        })
    })

    mapContainer.style.display ="grid"

}


export function getRandomColor(){
    
                    const r = Math.floor(Math.random()*256)
                    const g = Math.floor(Math.random()*256)
                    const b = Math.floor(Math.random()*256)

                    return `rgba(${r}, ${b}, ${b}, 0.6)`
                }


