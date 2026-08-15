from db.connection import get_db_connection

def createReportShift(id_enterprise):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
        SELECT 
            p.operator_id, 
            p.activity_id, 
            p.status, 
            p.create_date,
            a.title AS activity_title
        FROM production p 
        INNER JOIN activities a ON p.activity_id = a.id_activities
        WHERE p.id_enterprise = %s
        AND a.id_enterprise = %s 
        AND p.create_date >= (
            (CURRENT_TIMESTAMP AT TIME ZONE 'America/Sao_Paulo')::date AT TIME ZONE 'America/Sao_Paulo'
        )

        AND p.create_date < (
            ((CURRENT_TIMESTAMP AT TIME ZONE 'America/Sao_Paulo')::date + INTERVAL '1 day') AT TIME ZONE 'America/Sao_Paulo'
        )

    ''',(id_enterprise,id_enterprise)
    )
    report_data = cursor.fetchall()

    cursor.close()
    return (report_data)