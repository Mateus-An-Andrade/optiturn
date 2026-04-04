import {turn} from '../features/turn.js'
import {update_UI} from '../features/updateUI.js'

const button = document.getElementById("shift_change")
const tasksCreated = document.getElementById("infor_report_task")
const tasksIncomplete = document.getElementById("infor_report_tasks_pending")
const tasksComplete = document.getElementById("infor_report_tasks_complete")
const numberOperators = document.getElementById("infor_report_operators")
const dateReport = document.getElementById("date_report")
const user = JSON.parse(sessionStorage.getItem("user"))
const nameReport = document.getElementById("responsible_report")
const kpiTeam = document.getElementById("data_report_KPI_team")
const kpiTask = document.getElementById("data_report_KPI_task")


button.addEventListener("click", async () => {
    await turn()
})

export async function viewReport(data) {
    console.log("aqui estão os dados:",data)
    const ctx = document.getElementById('graphic_production')
        tasksCreated.innerText = data.numberTasksCreated
        tasksComplete.innerText = data.numberCompleteTasks
        tasksIncomplete.innerText = data.numberIncompleteTasks
        numberOperators.innerText = data.numberOperators
        //nameReport.innerText = user.name
        kpiTask.innerText = data.kpiTask+"% de eficiência"
        kpiTeam.innerText = "média de "+ data.kpiTeam+" atividades por operador"

        const formattedDate = new Date(data.dateReport).toLocaleDateString("pt-BR")

        dateReport.innerText = formattedDate


        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['TAREFAS CONCLUÍDAS', 'TAREFAS PENDENTE'],
                datasets: [{
                    data: [
                        data.numberCompleteTasks,
                        data.numberIncompleteTasks,
                    ],
                    backgroundColor: [
                        'rgb(34, 197, 94)',
                        'rgb(206, 35, 72)',
                        
                    ]
                }]
            }
        })

}