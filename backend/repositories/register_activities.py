from db.connection import get_db_connection

def register_activities_in_db(title,discreption,importance,created_by):
    conn = get_db_connection()
    cursor = conn.cursor()       

    cursor.execute('''INSERT INTO public.activities(title,
                                            descreption, 
                                            importance, 
                                            created_by)
                                            VALUES (
                                            %s,%s,%s,%s) ''',(title,discreption,importance,created_by))
    
    conn.commit()
    cursor.close()
    conn.close()

                                            #insert de atividades criadas no banco de dados.

    return ("Nova tarefa criada, pronta pra ser direcionada")