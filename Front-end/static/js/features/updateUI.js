async function update_UI(){
    try{
        const response = await fetch(`${API_BASE_URL}/main`,{
            method: "POST",
            credentials: "include"
        });
           
        
        if (!response.ok) throw new Error("Falha ao carregar dados")
        
        const data = await response.json()

        let name_gestor = document.getElementById("name_gestor_interface")
        let turn_gestor = document.getElementById("turn_gestor_interface")

        name_gestor.textContent = data.name
        turn_gestor.textContent = data.turn
        console.log(data)

    }catch (err) {
        console.error("Erro ao atualizar UI:", err);
    }

}                                                           

                                                                        //acima temos a função de atualização da interface, ou seja, ao logar ela será a responsável por mostrar o nome e o turno do gestor, assim como os icones presentes na página
    