import { API_BASE_URL } from "../features/config.js";
import { last_sorted } from "../features/productionRandom.js";

export async function randomDirectionService(){
    const response = await fetch(`${API_BASE_URL}/direction/random`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ refresh: false, confirm_production: false })


    })
        return await response.json()
}


export async function confirmDirectionService(){
   const response = await fetch(`${API_BASE_URL}/confirm/direction/random`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
           },
        credentials: "include",
        body: JSON.stringify({
            confirm_production: true,
            sorted: last_sorted
        })

    })

    console.log(response)
        return await response.json()
}