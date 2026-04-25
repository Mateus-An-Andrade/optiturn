import { map, completeTask, changeStatusMap } from "../features/map.js"

export async function mapService(){     
    const data = await map()
    console.log("tareafas direcionadas do serivdor:",data)
    return data
}

export async function changeStatusTaskMap(status,data) {
    if(status === "CONCLUIDO"){
       console.log("id:",data,"tarefa concluida")
        completeTask(data)
    }
    else if(status === "Em produção"){
        console.log("id:",data,"em produção!")
        changeStatusMap(data,status)
    }
    else if(status === "PENDENTE"){
        console.log("id",data,"status alterado para PENDENTE!")
        changeStatusMap(data,status)
    }
    
}