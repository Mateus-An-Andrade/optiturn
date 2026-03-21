from repositories.shiftReport import createReportShift

def report_service():
    reportData = createReportShift()
    
    arrayReport =[]

    for data in reportData:
        print(data)
        idOp= data[0],
        idTask = data[1],
        statusTask = data[2],
        dateTask= data[3],

      
        

        arrayReport.append({"idOps": idOp,
                  "idTask": idTask,
                  "status": statusTask,
                  "dateTask": dateTask,
                  "numberTasks": len(reportData)
                  })
   
    

    return (arrayReport)