from repositories.mapMenu_repositories import queryMap, updateProduction
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

    #print("dado agora:", data_query)

    if session["type_access"] == 'operator':

        for dt in data_query in session["id"] and session["id_enterprise"]:

            id_Op, name_Op, task_id, task_status, task_title, task_text, task_priority, id_enterprise = dt
            
            jsonMapOp = { "id_op":id_Op,
                        "name_Op":name_Op,
                        "task_id":task_id,
                        "task_status": task_status,
                        "task_title":task_title,
                        "task_text":task_text,
                        "task_priority":task_priority,
                        "id_enterprise":id_enterprise} 
        
            array_map_specific_operator.append(jsonMapOp)  


        print(session)
        print("ids do usuário logado:",)

    return(array_data_map)




def confirmTaskFinish(id_task,id_enterprise):
    updateProduction(id_task,id_enterprise)
