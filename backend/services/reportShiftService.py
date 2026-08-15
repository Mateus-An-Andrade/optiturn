from repositories.shiftReport import createReportShift
from datetime import timezone,datetime


def report_service(id_enterprise):
    reportData = createReportShift(id_enterprise)

    
    arrayLenOps = []
    arrayLenTasks =[]
    arrayCompleteTasks =[]
    arrayIncompleteTasks = []
    titleDemandComplete=[]
    titleDemandIncomplete=[]

    dateTask =  datetime.now()  

    for data in reportData:
        idOp= data[0]
        idTask = data[1]
        statusTask = data[2]
        titleDemand = data[4]

       
        dateTask = dateTask.replace(tzinfo=timezone.utc).astimezone()

        if statusTask == "CONCLUÍDO":
            arrayCompleteTasks.append(statusTask)
            titleDemandComplete.append(titleDemand)

        elif statusTask == "PENDENTE":
            arrayIncompleteTasks.append(statusTask)
            titleDemandIncomplete.append(titleDemand)

        elif statusTask == "Em produção":
            arrayIncompleteTasks.append(statusTask)
            titleDemandIncomplete.append(titleDemand)


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
             "kpiTeam": round(utilizationTeam,2),
             "kpiTask": round(utilizationTasks,2),
             "titleComplete": titleDemandComplete,
             "titleIncomplete": titleDemandIncomplete
             })