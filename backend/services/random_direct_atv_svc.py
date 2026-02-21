from repositories.random_direction_activities import random_direction_activities
from random import shuffle,choice


def randon_direction_act_svc():
    arrays_direct = random_direction_activities()
    
    array_task = arrays_direct[0]
    array_operators = arrays_direct[1]

    tasks = []
    shuffle(tasks)

    operators_sorted = []

    direct_order = []

    for data_task in array_task:
        id = data_task[0]
        description= data_task[1]
        
        task_dict={"id_task":id, "description":description}

        tasks.append(task_dict)
#--->b1

    for data_operator in array_operators:
        id_op = data_operator[0]
        operator_name = data_operator[1]

        ops_in_work = {"id_op":id_op, "ops_name":operator_name}
        operators_sorted.append(ops_in_work)

#---->b2

    for i, task in enumerate(tasks):
        operator = operators_sorted[i % len(operators_sorted)]
        direct_order.append({
            "task": task,
            "operator": operator
        })

                                                                    #o algoritmo acima é o algoritmo de direcionamento aleatório, ele deve fazer o sorteio das tarefas e associar ao operadores disponiveis. As tarefas e operadores vem do banco de dados, listas são criadas para separar de modo individual os operadores e tarefas mas a direct_order é o array final apos o resultado. b1 e b2 são os algoritmos que fazem o sorteio


    return(direct_order)


