import {productionSpecific,directionTaskService}  from "../services/productionSpecificService.js"
import { renderSpecificTasks } from "../view/productionSpecificDirectionView.js"


export async function productionDirectionSpecific(){
    specific_direction.addEventListener("click", async function(){

        try {
                const data = await productionSpecific();
                console.log("Dados de tarefas para direcionamento:",data)
                renderSpecificTasks(data)
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }

        })
}


export async function featureDirectionTask(payload){
     try {
        // chama o service que faz o POST
        const response = await directionTaskService(payload)

        if(response.ok){
            console.log("Task direcionada com sucesso:", payload)
        } else {
            console.error("Erro ao direcionar task:", payload)
        }

    } catch (error) {
        console.error("Falha ao enviar task:", error)
    }
}
       
