import { map, completeTask } from "../features/map.js"

export async function mapService(){     
    const data = await map()
    console.log("tareafas direcionadas do serivdor:",data)
    return data
}

export async function changeStatusTaskMap(status,data) {
    if(status == "CONCLUIDO",data){
       console.log("id:",data,"tarefa concluida")
        completeTask(data)
    }
    
}