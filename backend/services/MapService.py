from repositories.mapMenu_repositories import queryMap, updateProductionMap,updateProduction, queryMapOperator
from flask import session

def dataMap():
    data_query = queryMap()

    array_data_map = []
    array_map_specific_operator = []

    for d in data_query:

        id_Op, name_Op, task_id, task_status, task_title, task_text, task_priority, id_enterprise = d
        
        jsonMap = {   "id_op":id_Op,
                      "name_Op":name_Op,
                      "task_id":task_id,
                      "task_status": task_status,
                      "task_title":task_title,
                      "task_text":task_text,
                      "task_priority":task_priority,
                      "id_enterprise":id_enterprise} 
     
        array_data_map.append(jsonMap)  


    return(array_data_map)
#----------------------------------------------------------------------------------------------------------------

def mapOperator(idOperator,idEnterprise):
    data = queryMapOperator(idOperator,idEnterprise)

    arrayDataMapOperator = []

    for d in data:

        id_Op, name_Op, task_id, task_status, task_title, task_text, task_priority, id_enterprise = d
        
        jsonMap = {   "id_op":id_Op,
                      "name_Op":name_Op,
                      "task_id":task_id,
                      "task_status": task_status,
                      "task_title":task_title,
                      "task_text":task_text,
                      "task_priority":task_priority,
                      "id_enterprise":id_enterprise} 
     
        arrayDataMapOperator.append(jsonMap)  

    return (arrayDataMapOperator)

def mapProductionStatus(id_task,id_enterprise,status):
    updateProductionMap(id_task,id_enterprise,status)

#----------------------------------------------------------------------------------------------------------------

def confirmTaskFinish(id_task,id_enterprise):
    updateProduction(id_task,id_enterprise)
