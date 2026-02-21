from repositories.specific_direction import specific_direction

def specific_direction_svc():
    arrays_data = specific_direction()

    array_ops = arrays_data [1]
    array_task = arrays_data [0]

    array_direct = []

    ops = []
    tasks = []

    for data in array_task:
        id = data[0]
        description = data[1]

        task_dict = {"id_task": id, "description_task": description}

        tasks.append(task_dict)

    for op in array_ops:
        id_op = op[0]
        name_op = op[1]
        
        dict_ops = {"id_op": id_op, "name_op": name_op}

        ops.append(dict_ops)

    array_direct.append({"ops":ops,"tasks":tasks})

    return array_direct