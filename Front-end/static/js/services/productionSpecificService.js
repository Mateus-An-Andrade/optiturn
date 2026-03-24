import { API_BASE_URL } from "../features/config.js";

export async function productionSpecific() {
const response = await fetch(`${API_BASE_URL}/direction/specific`,{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include"
        })

        return await response.json()
     }


export async function directionTaskService(payload) {
    return fetch(`${API_BASE_URL}/direction/specific/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
}


