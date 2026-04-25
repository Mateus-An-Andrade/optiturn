 import { API_BASE_URL } from "./config.js";
 
 export async function logOut(){
    const logOut = document.getElementById("logOutSystem")

        logOut.addEventListener("click", async function(event){
            event.preventDefault()
            try{
                 const response = await fetch(`${API_BASE_URL}/logout`, { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({}),
                    credentials: "include"
                });
                    if (response.ok) {
                    console.log("Sessão encerrada no servidor.");
                }
                    } catch (error) {
                        console.error("Erro ao comunicar com o servidor:", error);
                    } finally {
                        // Redireciona de qualquer forma para garantir que o usuário saia da tela atual
                        window.location.href = 'index.html';
                }
        });
}
 