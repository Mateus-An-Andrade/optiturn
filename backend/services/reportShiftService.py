from repositories.shiftReport import createReportShift
from datetime import timezone,datetime
import pytz

def report_service(id_enterprise):
    reportData = createReportShift(id_enterprise)
    print(reportData)
    br = pytz.timezone('America/Sao_Paulo')
    
    arrayLenOps = []
    arrayLenTasks =[]
    arrayCompleteTasks =[]
    arrayIncompleteTasks = []

    dateTask =  datetime.now(br)  

    for data in reportData:
        idOp= data[0]
        idTask = data[1]
        statusTask = data[2]

       
        dateTask = dateTask.replace(tzinfo=timezone.utc).astimezone(br)

        if statusTask == "CONCLUÍDO":
            arrayCompleteTasks.append(statusTask)

        elif statusTask == "PENDENTE":
            arrayIncompleteTasks.append(statusTask)


        if idOp not in arrayLenOps:
            arrayLenOps.append(idOp)

        if idTask not in arrayLenTasks:
            arrayLenTasks.append(idTask)
    utilizationTeam = (len(arrayCompleteTasks)/len(arrayLenOps)) if len(arrayLenOps) > 0 else 0
    utilizationTasks = ((len(arrayCompleteTasks)/len(arrayLenTasks))*100) if len(arrayLenTasks) > 0 else 0

    return ({"numberOperators": len(arrayLenOps),
             "numberTasksCreated": len(arrayLenTasks),
             "dateReport": dateTask,
             "numberCompleteTasks": len(arrayCompleteTasks),
             "numberIncompleteTasks": len(arrayIncompleteTasks),
             "kpiTeam": utilizationTeam,
             "kpiTask": round(utilizationTasks, 2)
             })