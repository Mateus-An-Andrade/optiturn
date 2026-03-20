from db.connection import get_db_connection

def random_direction_activities():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''SELECT id_activities,title FROM activities WHERE in_production IS null''')
    tasks= cursor.fetchall()

    cursor.execute('''SELECT id_operador, name FROM operador''')
    operators= cursor.fetchall()

    cursor.close()
    conn.close()
   

    return (tasks, operators)


def confirmRandomDirect(sorted_data):
    conn = get_db_connection()
    cursor = conn.cursor()

    for data in sorted_data:
        cursor.execute('''INSERT INTO production(
                                    operator_id, 
                                    activity_id,
                                    status) 
                                    VALUES (%s,%s,%s)''',
                                    (data['operator']['id_op'],
                                     data['task']['id_task'],"PENDENTE"))
        
        cursor.execute('''INSERT INTO activities (in_production) VALUES ('true')''')


                                                                
    conn.commit()
    cursor.close()
    
                                                    #acima a função de atualizar na tabela o estado booleano das atividades para true para evitar que as atividades sejam sorteadas/direcionadas novamente.
    