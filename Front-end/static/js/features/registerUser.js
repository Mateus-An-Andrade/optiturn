function register_user(){
    let option_register01 = document.getElementById("opt_register_worker01")   
    let opt_register02 = document.getElementById("opt_register_worker02") 
    let confirmation_register_button = document.getElementById("confirmation_button")

                                                                                        /*acima temos as variaveis que armazenam as classes e IDs do elementos HTML referentes ao menu de registros */
    close_windows("menu_register", menu_register)
    open_menu("register_button","menu_register", "grid", "/register_user")
    open_inner_option("opt_register_worker01", "register_leader", "flex")
    open_inner_option("opt_register_worker02", "register_operator", "flex")


                                                                                    /* acima temos a mudança da url ao entrar no menu e a captura dos valores quando o botão de "cadastrar" é clicado.*/
        
        confirmation_register_button.addEventListener("click", function(){
            if( option_register01.checked){
                const name = document.getElementById("name_new_user").value
                const user = document.getElementById("user_gestor").value
                const turn = document.getElementById("shift_gestor").value
                const password= document.getElementById("password_gestor").value

                fetch(`${API_BASE_URL}/register/manager` ,{
                    method:"POST",
                    headers:{
                        'Content-type': 'application/json',
                    },
                    credentials: "include",
                    body:JSON.stringify({
                        name: name,
                        user: user,
                        turn: turn,
                        password: password


                    })
                })

                .then(response => response.json())
                .then(data =>
                    console.log("resposta do servidor:",data)
                )

                    show_confirmation_menssage("Cadastro realizado com sucesso!", time=3000,menu_register)
                                                                            /*acima temos a conexão com o backend, ele pega as informações que estão no front e foram capturadas pelas variaveis que armazena os inputs, cria um arquivo JSON, e envia para o back end para a rota do gestor */

            }else if(opt_register02.checked){
                const name_operator = document.getElementById("name_new_operator").value

                fetch(`${API_BASE_URL}/register/operator`,{
                    method: "POST",
                    headers:{
                        'Content-type': 'application/json',
                    },
                    credentials: "include",
                    body:JSON.stringify({
                        name_operator:name_operator,
                    })

                })

                .then(response => response.json())
                .then(data =>
                    console.log("resposta do servidor:",data)
                )

                                                        
                                                                            /*acima temos a conexão com o backend, ele pega as informações que estão no front e foram capturadas pelas variaveis que armazena os inputs, cria um arquivo JSON, e envia para o back end para a rota do operador */
                show_confirmation_menssage("Cadastro realizado com sucesso!", time=3000,menu_register)
        
            } 
           
                                                                                 /* acima temos a animação mais básica para o evento de confirmação! */
                                                                                
    
        })
}
