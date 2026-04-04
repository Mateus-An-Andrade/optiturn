import { API_BASE_URL } from "../features/config.js";


export async function registerManager(data) {
    try{    
        const response = await fetch(`${API_BASE_URL}/register/manager`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data)
        })

        const text = await response.text();
        console.log("RAW RESPONSE:", text);

        const result = JSON.parse(text);

        return {
            ok: response.ok,
            data: result
        };

    }catch(error){
            return{erro:"dado errado"}
        }
    
}
  
export async function registerOperator(data) {
    try{
        const response = await fetch(`${API_BASE_URL}/register/operator`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data)
        })

        const text = await response.text();
            console.log("RAW RESPONSE:", text);

            const result = JSON.parse(text);

            return {
                ok: response.ok,
                data: result
            };

        }catch(error){
                return{erro:"dado errado"}        
        
    }
}

                                                        
                                                                            /*acima temos a conexão com o backend, ele pega as informações que estão no front e foram capturadas pelas variaveis que armazena os inputs, cria um arquivo JSON, e envia para o back end para a rota do operador */
        
