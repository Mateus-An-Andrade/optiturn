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


button.addEventListener("click", async () => {
    await turn()
})

export async function viewReport(data) {
    console.log("aqui estão os dados:",data)
        tasksCreated.innerText = data.numberTasksCreated
        tasksComplete.innerText = data.numberCompleteTasks
        tasksIncomplete.innerText = data.numberIncompleteTasks
        numberOperators.innerText = data.numberOperators
        nameReport.innerText = user.name

        const formattedDate = new Date(data.dateReport).toLocaleDateString("pt-BR")

        dateReport.innerText = formattedDate


}