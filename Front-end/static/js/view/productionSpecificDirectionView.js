import { featureDirectionTask } from "../features/productionSpecific.js"

import {show_confirmation_menssage} from "../features/confirmMenssage.js"


    export async function renderSpecificTasks(dataForProduction) {
        const specific_directionButton = document.getElementById("specific_direction")
        const containerDirection = document.getElementById("directionOperatorFrame")
        const confirmation_button_direction = document.getElementById("confirmation_button_direction")

        let demands = []
        let arrayOps = []

        let arrayDirectDemand =[]

        dataForProduction.forEach(data => {
            arrayOps.push(...data.ops)
            demands.push(...data.tasks)
        });

            containerDirection.style.display = "flex"

            demands.forEach(element =>{

    //==========================================================================================================
                const hr = document.createElement("hr")
                const demandContainer = document.createElement("div")
                    demandContainer.classList.add("demandContainer")

            
                const titleDemand = document.createElement("div")
                        titleDemand.classList.add("titleDemand")
                        titleDemand.textContent = element.title
    
                const descriptionDemand = document.createElement("div")
                        descriptionDemand.classList.add("descriptionDemand")
                        descriptionDemand.textContent = element.description_task
                        descriptionDemand.append(hr)
                
                const operatorsToWork = document.createElement("div")
                    operatorsToWork.classList.add("operatorsToWork")

                    
                        arrayOps.forEach(operator =>{
                            const buttonsOperators = document.createElement("button")
                                 buttonsOperators.classList.add("operatorSelect")
                                 buttonsOperators.textContent = operator.name_op
                            operatorsToWork.append(buttonsOperators)

                            buttonsOperators.addEventListener("click",function(){
                                const everyButtons =  operatorsToWork.querySelectorAll(".operatorSelect")

                                everyButtons.forEach(button =>{
                                    if(button === buttonsOperators){
                                        button.style.opacity = "1"
                                        button.style.pointerEvents = "none"
                                        arrayDirectDemand.push(
                                            
                                                    {
                                                        idDemand:element.id_task, 
                                                        idOperatorDirect:operator.id_op
                                                    })

                                        console.log("tarefa direcionada:",arrayDirectDemand)
                                    }else{
                                        button.disabled = true
                                        button.style.opacity = "0.4"
                                    }
                                })
                            })
                        })

                containerDirection.append(demandContainer)
        
                demandContainer.append(titleDemand,descriptionDemand,operatorsToWork,hr)

                                                                //criação de elementos na tela,aqui é criada toda a div de demandas e operadores de acordo com o que chega do back-end.

//==============================================================================================================

                    titleDemand.addEventListener("click",function(){
                        if (descriptionDemand.style.display === "none") {
                            descriptionDemand.style.display = "flex"
                            operatorsToWork.style.display = "flex"
                        } else {
                            descriptionDemand.style.display = "none"
                            operatorsToWork.style.display = "none"
                        }
                    })
            })

            confirmation_button_direction.addEventListener("click",function(){
                featureDirectionTask(arrayDirectDemand)
                show_confirmation_menssage("TAREFA ENVIADA AO SERVIDOR",3000,menu_production)
            })
        
    }   


