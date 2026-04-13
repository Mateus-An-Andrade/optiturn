from repositories.specific_direction import specific_direction

def specific_direction_svc(id_enterprise):
    arrays_data = specific_direction(id_enterprise)

    array_ops = arrays_data [1]
    array_task = arrays_data [0]

    array_direct = []

    ops = []
    tasks = []

    for data in array_task:
        id = data[0]
        title = data[1]
        description = data[2]
        importance = data[3]
        id_enterprise = data[4]

        task_dict = {"id_task": id,"title": title, "description_task": description,"importance":importance, "id_enterprise": id_enterprise}

        tasks.append(task_dict)

    for op in array_ops:
        id_op = op[0]
        id_enterprise = op[1]
        name_op= op[2]
        
        dict_ops = {"id_op": id_op, "name_op": name_op, "id_enterprise": id_enterprise}

        ops.append(dict_ops)

    array_direct.append({"ops":ops,"tasks":tasks})

    return array_direct