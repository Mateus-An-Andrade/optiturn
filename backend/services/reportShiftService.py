from repositories.shiftReport import createReportShift

def report_service():
    reportData = createReportShift()
    

    arrayLenOps = []
    arrayLenTasks =[]
    arrayCompleteTasks =[]
    arrayIncompleteTasks = []

    for data in reportData:
        idOp= data[0]
        idTask = data[1]
        statusTask = data[2]
        dateTask= data[3]

        if statusTask == "CONCLUÍDO":
            arrayCompleteTasks.append(statusTask)

        elif statusTask == "PENDENTE":
            arrayIncompleteTasks.append(statusTask)


        if idOp not in arrayLenOps:
            arrayLenOps.append(idOp)

        if idTask not in arrayLenTasks:
            arrayLenTasks.append(idTask)
    
    return ({"numberOperators": len(arrayLenOps),
             "numberTasksCreated": len(arrayLenTasks),
             "dateReport": dateTask,
             "numberCompleteTasks": len(arrayCompleteTasks),
             "numberIncompleteTasks": len(arrayIncompleteTasks)
             })