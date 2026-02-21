from db.connection import get_db_connection

def specific_direction():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''SELECT id_activities,title FROM activities''')
    tasks= cursor.fetchall()

    cursor.execute('''SELECT id_operador, name FROM operador''')
    operators= cursor.fetchall()

    cursor.close()
    conn.close()
   

    return (tasks, operators)