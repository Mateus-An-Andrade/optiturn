from repositories.mapMenu_repositories import queryAndUpdateMap

def dataMap():
    data_query = queryAndUpdateMap()

    array_data_map = []

    for d in data_query:

        id_Op, name_Op, task_id, task_status, task_title, task_text, task_priority = d
        
        jsonMap = {   "id_op":id_Op,
                      "name_Op":name_Op,
                      "task_id":task_id,
                      "task_status": task_status,
                      "task_title":task_title,
                      "task_text":task_text,
                      "task_priority":task_priority} 
     
        array_data_map.append(jsonMap)  

    return(array_data_map)