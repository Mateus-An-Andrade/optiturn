import { API_BASE_URL } from "../features/config.js";

export async function update_UI(){
   
     try{
        let type_acess_system = document.getElementById("type_acess_system")
        let name_gestor = document.getElementById("name_gestor_interface")
        let shift_gestor = document.getElementById("turn_gestor_interface")

         const response = await fetch(`${API_BASE_URL}/main`,{
             method: "POST",
             credentials: "include"
         });
         
         
        if (!response.ok) throw new Error("Falha ao carregar dados")
        const data = await response.json()
        console.log("esses são os dados da session:",data)

        if(data.type_access === "leader"){            
            name_gestor.textContent = data.name
            shift_gestor.textContent = data.shift
            window.currentUser = data

        }else if(data.type_access === "operator"){
            type_acess_system.innerText = "Olá operador: "
            name_gestor.textContent = data.name
            shift_gestor.textContent = data.shift

            let menu_buttons = document.querySelectorAll(".botoes_menu button")

                menu_buttons.forEach(btn =>{
                    console.log(btn)
                    if(btn.id !== "map_button"){
                        btn.style.display = "none"
                    }
                })
        }
     
        window.currentUser = data
        sessionStorage.setItem("user", JSON.stringify(data))

     }catch (err) {
         console.error("Erro ao atualizar UI:", err);
     }

}                                                          

                                                                        //acima temos a função de atualização da interface, ou seja, ao logar ela será a responsável por mostrar o nome e o turno do gestor, assim como os icones presentes na página
    