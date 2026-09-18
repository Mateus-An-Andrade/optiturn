from db.connection import get_db_connection

def register_activities_in_db(title,discreption,importance,created_by,id_enterprise):
    conn = get_db_connection()
    cursor = conn.cursor()       

    cursor.execute('''INSERT INTO public.activities(title,
                                            descreption, 
                                            importance, 
                                            created_by,
                                            id_enterprise)
                                            VALUES (
                                            %s,%s,%s,%s,%s) ''',(title,discreption,importance,created_by,id_enterprise))
    
    conn.commit()
    cursor.close()
    conn.close()

                                            #insert de atividades criadas no banco de dados.

    return ("Nova tarefa criada, pronta pra ser direcionada")



def upDemandForProduction(title,description,importance,idLeader,idEnterprise):

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''INSERT INTO public.activities(
                                                    title,
                                                    descreption, 
                                                    importance, 
                                                    created_by,
                                                    id_enterprise,
                                                    in_production,
                                                    "PermanentDemand"
                                                ) VALUES(%s,%s,%s,%s,%s,'FALSE','FALSE')''', (title,description,importance,idLeader,idEnterprise))

    conn.commit()
    cursor.close()
    conn.close()

    return ("Tarefa em produção, pronta pra ser direcionada")