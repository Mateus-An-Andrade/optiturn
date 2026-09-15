import { open_menu, open_inner_option } from './openWindows.js';
import { close_windows } from './closeWindows.js';
import { API_BASE_URL } from "./config.js";
import { show_confirmation_menssage } from "./confirmMenssage.js    "

export function create_activities(dataDemand){
    let time = 0
    let menu_activity = document.getElementById("menu_activities")
    let confirmation_register_button = document.getElementById("confirmation_button_activity")
    let permanentDemandButton = document.getElementById("permanentDemandButton")

                                                                    /*acima temos as variaveis que armazenam as classes e IDs do elementos HTML referentes ao menu de atividades */
    open_menu("activity_button","menu_activities","flex")
    open_inner_option("periodicDemandButton","periodicDemandMenuCreate","flex", "demandMenu", "permanentDemandMenu")
    open_inner_option("permanentDemandButton", "permanentDemandMenu", "flex", "demandMenu", "periodicDemandMenuCreate")
    close_windows("menu_activities",menu_activity )


                                                                    //acima temos as interações basicas do menu que permite que ele seja aberto para a interação do usuário e a mudança da url do menu.

    const importance_task = document.querySelectorAll(".priority_btn")
    let dataImportance = null
    
    importance_task.forEach(btn =>{
                btn.addEventListener("click", function(){
                dataImportance = btn.textContent.trim()
                })
            })
    confirmation_register_button.addEventListener("click",function(){
        
        const title_task_created = document.getElementById("title_task_created").value
        const descreption_task_text = document.getElementById("descreption_task_text").value

        console.log("tarefa criada:", title_task_created,descreption_task_text,dataImportance)

        fetch(`${API_BASE_URL}/create/activity`,{
            method: "POST",
            headers:{
                'Content-type': 'application/json',
            },
            credentials: "include",
            body:JSON.stringify({
                title_task_created:title_task_created,
                descreption_task_text: descreption_task_text,
                importance_task: dataImportance
            })
        })
            .then(response => response.json())
            .then(data =>{
                const realResponse = data
                console.log(realResponse)

                if(realResponse.status === "success"){
                    show_confirmation_menssage(realResponse.message, time=3000,menu_activity, "success")
                }else{
                    show_confirmation_menssage(realResponse.message, time=3000,menu_activity, "error")
                }

                                                                         //acima temos a interação do usuário que mostra a mensagem de sucesso quando a tarefa é registrada.
            })
       
    })

                                            /*acima temos as variaveis que recebem os campos referentes as informações que o gestor vai imputar referente as tarefas criadas, para enviar para o backend, assim como o fetch para enviar os dados ao backend*/


    permanentDemandButton.addEventListener("click", function(){
        let permanentDemandMenu = document.getElementById("permanentDemandMenu")
        fetch(`${API_BASE_URL}/create/permanentActivity`,{  
            method: "POST",
            headers:{
                'Content-type': 'application/json',
            },
            credentials: "include",
            body:JSON.stringify({data:dataDemand})
        })

        .then(response => response.json())
        .then(data => {
            const oldContainers = permanentDemandMenu.querySelectorAll('.permanentDemandMenuContainer');
            oldContainers.forEach(el => el.remove());

            const tableContainer = document.createElement("div");
            tableContainer.classList.add('permanentDemandMenuContainer');

            tableContainer.style.display = "grid";
            tableContainer.style.backgroundColor = "black";

            const table = document.createElement("table")
            const tableHead = document.createElement("thead")
            const tableHeadRow = document.createElement("tr")
                  tableHead.id="headDemandTable"
            const tableBody = document.createElement("tbody")

            const thTitle = document.createElement("th");
            const thDescription = document.createElement("th");
            const thImportance = document.createElement("th");
            const thSelection = document.createElement("th");

                                                     //Criação do container que receberá a tabela de demandas fixas e da tabela que vai exibir os dados na tela de acordo com o que vier da base de dados como fixo. Criação da tabela,head, row, body


            thTitle.append("Título")
            thDescription.append("Descrição")
            thImportance.append("Importância")
            thSelection.append("Subir para produção?")


            tableHeadRow.append(thTitle);
            tableHeadRow.append(thDescription);
            tableHeadRow.append(thImportance);
            tableHeadRow.append(thSelection);

            tableHead.append(tableHeadRow);
                                                        //Criação de textos que vão no cabeçalho da tabela e inserção dos mesmos no elemento head da tabela.
            data.forEach((e, index) =>{
                const tableRow = document.createElement("tr") //1

                const tdTitle = document.createElement("td");//2
                const tdDescription = document.createElement("td");//2
                const tdImportance = document.createElement("td");//2
                const tdSelection = document.createElement("td");//2


                const checkBox = document.createElement("input")//2.1
                checkBox.type = "checkbox"//2.1
                checkBox.classList = "upProduction"//2.1
                checkBox.dataset.index = index//2.1
            

                tdTitle.textContent = e[0]; //3
                tdDescription.textContent = e[1];//3
                tdImportance.textContent = e[2];//3
                tdSelection.appendChild(checkBox)


                                                        //Loop que percorre os dados retornados do servidor indexando cada linha pelo checkbox: Para cada dado retornado: 1-crie uma nova linha, 2-crie esses elementos nas linhas criadas, 2.1- criação do checkbox, definição da sua classe e indicação de index 3- pegue esses indices e coloque os dados deles nos dados correspondentes das linhas    

                tableRow.appendChild(tdTitle);
                tableRow.appendChild(tdDescription);
                tableRow.appendChild(tdImportance);
                tableRow.appendChild(tdSelection);

                tableBody.appendChild(tableRow);

                                                        //Adição dos dados: Titulo, descrição, importância e seleção nas linhas da tabela.
            })
            
            table.appendChild(tableHead);
            table.appendChild(tableBody);

            tableContainer.appendChild(table);
            permanentDemandMenu.appendChild(tableContainer);

                                                                    //Criação dos elementos da tabela.
            
            console.log("esses são os dados",data)})



                                            /*Fetch que recupera do backend as demandas permanentes ou ciclica. Ao clicar em demandas permanentes ele já recebe do servidor todas as que são cadastradas com o status True de demandas permanentes.*/

    })

    
                                                                
}
