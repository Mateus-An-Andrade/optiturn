function turn(){
    let button_shift_change = document.getElementById("shift_change")
    let buttons_menu = document.getElementById("buttons_menu")
    let turn_menu = document.getElementById("turn_menu")
    let header_turn = document.querySelector(".cabeçalho_menu_turno")
    const container_table_turn = document.createElement("div")
    let shift_demand = document.getElementById("shift_demand")
    const close_window_icon = document.querySelectorAll(".fechar_janela")

    close_windows("turn_menu",turn_menu )
            
    button_shift_change.addEventListener("click",function(){
        buttons_menu.style.display = "none"
        turn_menu.style.display = "block"
        header_turn.style.display = "grid"
        history.replaceState({},"","/turn_menu")

            container_table_turn.innerHTML = ""

        fetch(`${API_BASE_URL}/turn_menu`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({confirm_demand: false})

       })
       .then(response => response.json())
       .then(data_report_turn =>{
            console.log("dados do relatório de turno:",data_report_turn)

            const container_table = document.createElement("div")
            container_table.classList.add("tabela_relatorio")


            let table_turn_report = document.createElement("table")
            table_turn_report.classList.add("relatorio_de_turno")


            let header = document.createElement("tr")
            let th1 = document.createElement("th")
            let th2 = document.createElement("th")
            let th3 = document.createElement("th")

            th1.textContent = "ATIVIDADE"
            th2.textContent = "DESCRIÇÃO"
            th3.textContent = "STATUS"


            header.appendChild(th1)
            header.appendChild(th2)
            header.appendChild(th3)

            table_turn_report.appendChild(header)

                                                                                        //Acima, quando o botão de passagem de turno é clicado, o sistema abre um fetch e solicita ao back-end que envie os dados do relatório, ao receber esse dados ele mostra no console do navegador e inicia a criação dinamica dos elementos da tabela.
                                                                            
            data_report_turn.forEach(line => {
                let row = document.createElement("tr")

                let row_data_activity = document.createElement("td")

                let row_data_description = document.createElement("td")

                let row_data_status = document.createElement("td")

                row_data_activity.textContent = line.title
                row_data_description.textContent = line.description
                row_data_status.textContent = line.status





                                                                                            //Acima, o algoritmo entra em um loop, que a cada linha no json ele deverá criar a mesma quantidade de linhas na tabela, criando primeiro o cabeçalho dela e logo apos as linhas com titulo descrição e status inserindo os textos retornados do banco de dados.
                row.appendChild(row_data_activity)
                row.appendChild(row_data_description)
                row.appendChild(row_data_status)
                

                table_turn_report.appendChild(row)
            })

            container_table.appendChild(table_turn_report)
            container_table_turn.appendChild(table_turn_report)
            container_table_turn.appendChild(shift_demand)
            turn_menu.appendChild(container_table_turn);

            shift_demand.addEventListener("click",function(){

                fetch(`${API_BASE_URL}/turn_menu`,{
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({confirm_demand : true})
                })

                .then(response => response.json())
                .then(data_back =>{
                    console.log("Resposta do servidors:", data_back)
                    table_turn_report.innerHTML = ""
                    show_confirmation_menssage("TURNO RECEBIDO!", time=3000,turn_menu)
                })
            })


                                                                        //Acima o algoritmo faz a comunicação com o back, informando que pode apagar o que foi concluido, e espera a resposta do que ficou pendente.
        })
    })
}