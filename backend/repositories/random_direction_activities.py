from db.connection import get_db_connection

def random_direction_activities(id_enterprise):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''SELECT id_activities, id_enterprise, title FROM activities WHERE in_production IS null AND id_enterprise = %s''', (id_enterprise,))
    tasks= cursor.fetchall()

    cursor.execute('''SELECT id_user, id_enterprise, name FROM user_systems WHERE type_access = 'operator' AND id_enterprise = %s''',(id_enterprise,))
    operators= cursor.fetchall()

    cursor.close()
    conn.close()
   

    return (tasks, operators)


def confirmRandomDirect(sorted_data,id_enterprise):
    conn = get_db_connection()
    cursor = conn.cursor()

    for data in sorted_data:
        cursor.execute('''INSERT INTO production(
                                    operator_id, 
                                    activity_id,
                                    status,
                                    create_date,
                                    id_enterprise) 
                                    VALUES (%s,%s,%s,NOW(),%s)''',
                                    (data['operator']['id_op'],
                                     data['task']['id_task'],"PENDENTE",
                                     id_enterprise))
        
        cursor.execute(''' UPDATE activities SET in_production = 'true' WHERE id_enterprise = %s AND id_activities = %s''',(id_enterprise,data['task']['id_task']))


                                                                
    conn.commit()
    cursor.close()
    
                                                    #acima a função de atualizar na tabela o estado booleano das atividades para true para evitar que as atividades sejam sorteadas/direcionadas novamente.
    