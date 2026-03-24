import { API_BASE_URL } from "../features/config.js";


export async function registerManager(data) {
    const response = await fetch(`${API_BASE_URL}/register/manager`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data)
    })

    return response.json()
}
  
export async function registerOperator(data) {
    const response = await fetch(`${API_BASE_URL}/register/operator`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data)
    })

    return response.json()
}
                                                        
                                                                            /*acima temos a conexão com o backend, ele pega as informações que estão no front e foram capturadas pelas variaveis que armazena os inputs, cria um arquivo JSON, e envia para o back end para a rota do operador */
        
