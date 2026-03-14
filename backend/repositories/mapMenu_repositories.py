from db.connection import get_db_connection

def queryMap():
    conn= get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
               SELECT 
                   p.operator_id,
                   o.name,
                   p.activity_id,
                   p.status,
                   a.title,
                   a.descreption,
                   a.importance
               FROM production p
               JOIN operador o ON p.operator_id = o.id_operador
               JOIN activities a ON p.activity_id = a.id_activities
                WHERE p.status = 'PENDENTE'
           ''')
    

    data_for_map = cursor.fetchall()


    cursor.close()
    conn.close()

    return (data_for_map)


                                                    #acima o algoritmo deve criar uma lista vazia e selecionar tudo da tabela produção, fazer uma junção com os IDs correspondentes em activities e em operador, pegar todo o #resultado e colocar na variavel data_for_map.



def updateProduction(id_task):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(''' UPDATE production SET status = 'CONCLUÍDO' WHERE activity_id = %s''', (id_task,))

    conn.commit()
    cursor.close()
    conn.close()

    return("Status OK!")
