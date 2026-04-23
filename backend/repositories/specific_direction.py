from db.connection import get_db_connection

def specific_direction(id_enterprise):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''SELECT id_activities,title,descreption,importance, id_enterprise FROM activities WHERE in_production IS null AND id_enterprise = %s''', (id_enterprise,))
    tasks= cursor.fetchall()

    cursor.execute('''SELECT id_user, id_enterprise, name FROM user_systems WHERE type_access = 'operator' AND id_enterprise = %s''',(id_enterprise,))
    operators= cursor.fetchall()

    cursor.close()
    conn.close()

    
    return (tasks, operators)

def confirmSpecifcDirect(sorted_data,id_enterprise):
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
                                    (data['operator_id'],
                                     data['task_id'],"PENDENTE",id_enterprise))
        
        cursor.execute('''
                UPDATE activities 
                SET in_production = true 
                WHERE id_activities = %s
            ''', (data['task_id'],))

        conn.commit()



                                                                
    conn.commit()
    cursor.close()