from db.connection import get_db_connection

def permanentDemand(title,description,importance,createdBy,idEnterprise,PermanentDemand):

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''SELECT
                            title,
                            descreption,
                            importance,
                            created_by,
                            id_enterprise,
                            "PermanentDemand"
                    FROM public.activities WHERE "PermanentDemand" = TRUE''')

    result = cursor.fetchall()
    cursor.close()
    conn.close()
    print("esse é o resultado:", result)

    return (result)

                                                                 #Query que busca na base de dados as demandas que são "permanentes" ou ciclicas ou diárias, que devem ser realizadas todos os dias ou que não podem deixar de ser realizada