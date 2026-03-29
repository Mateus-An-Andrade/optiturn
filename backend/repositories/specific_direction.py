from db.connection import get_db_connection

def specific_direction():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''SELECT id_activities,title,descreption,importance FROM activities WHERE in_production IS null''')
    tasks= cursor.fetchall()

    cursor.execute('''SELECT id_operador, name FROM operador''')
    operators= cursor.fetchall()

    cursor.close()
    conn.close()

    
    return (tasks, operators)

def confirmSpecifcDirect(sorted_data):
    conn = get_db_connection()
    cursor = conn.cursor()

    for data in sorted_data:
        cursor.execute('''INSERT INTO production(
                                    operator_id, 
                                    activity_id,
                                    status,
                                    create_date) 
                                    VALUES (%s,%s,%s,NOW())''',
                                    (data['operator_id'],
                                     data['task_id'],"PENDENTE"))
        
        cursor.execute('''
                UPDATE activities 
                SET in_production = true 
                WHERE id_activities = %s
            ''', (data['task_id'],))

        conn.commit()



                                                                
    conn.commit()
    cursor.close()