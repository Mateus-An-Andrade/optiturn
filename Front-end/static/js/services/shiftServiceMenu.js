    import { API_BASE_URL } from "../features/config.js";

    export async function shiftServiceMenu() {

        const response = await fetch(`${API_BASE_URL}/shiftreport`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"

        })

        return await response.json()

                                                    //Acima o algoritmo faz a comunicação com o back, informando que pode apagar o que foi concluido, e espera a resposta do que ficou pendente.
    }