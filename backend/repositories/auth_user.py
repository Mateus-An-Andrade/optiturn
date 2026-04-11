from db.connection import get_db_connection
import psycopg2.extras



def auth_user_credentials(username,password):
    conn= get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    cursor.execute('''
                   SELECT * FROM user_systems
                    WHERE 
                   user_name = %s AND password = %s''',
                   (username,password)
                )
    
    user= cursor.fetchone()
    cursor.close()
    conn.close()

    return user