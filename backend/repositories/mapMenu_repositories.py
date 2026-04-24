from db.connection import get_db_connection

def queryMap():
    conn= get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
               SELECT 
                   p.operator_id,
                   u.name,
                   p.activity_id,
                   p.status,
                   a.title,
                   a.descreption,
                   a.importance,
                   u.id_enterprise
               FROM production p
               JOIN user_systems u ON p.operator_id = u.id_user
               JOIN activities a ON p.activity_id = a.id_activities
                WHERE p.status IN ('PENDENTE', 'Em produção')
           ''')
    

    data_for_map = cursor.fetchall()


    cursor.close()
    conn.close()

    return (data_for_map)


                                                    #acima o algoritmo deve criar uma lista vazia e selecionar tudo da tabela produção, fazer uma junção com os IDs correspondentes em activities e em operador, pegar todo o #resultado e colocar na variavel data_for_map.



def updateProduction(id_task,id_enterprise):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(''' UPDATE production SET status = 'CONCLUÍDO' WHERE activity_id = %s AND id_enterprise =%s''', (id_task,id_enterprise,))

    conn.commit()
    cursor.close()
    conn.close()

    return("Status OK!")


def updateProductionMap(id_task,id_enterprise):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(''' UPDATE production SET status = 'Em produção' WHERE activity_id = %s AND id_enterprise =%s AND status = 'PENDENTE' ''', (id_task,id_enterprise,))

    conn.commit()
    cursor.close()
    conn.close()

    return("Status OK!")
