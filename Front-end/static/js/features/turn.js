import {shiftServiceMenu} from '../services/shiftServiceMenu.js'
import {viewReport} from '../view/shiftViewMenu.js'


export async function turn(){
    try {
        const data = await shiftServiceMenu();
        Object.entries(data).forEach(valor =>{
            console.log("dados enviados a view!")
        })

        viewReport(data);
        return data
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}