from db.connection import get_db_connection

def createReportShift(id_enterprise):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
        SELECT 
            operator_id, 
            activity_id, 
            status, 
            create_date
        FROM production
        WHERE id_enterprise = %s
        AND create_date >= (
            (CURRENT_TIMESTAMP AT TIME ZONE 'America/Sao_Paulo')::date AT TIME ZONE 'America/Sao_Paulo'
        )
        AND create_date < (
            ((CURRENT_TIMESTAMP AT TIME ZONE 'America/Sao_Paulo')::date + INTERVAL '1 day') AT TIME ZONE 'America/Sao_Paulo'
        )
    ''',(id_enterprise,)
    )
    report_data = cursor.fetchall()

    cursor.close()
    print(report_data)
    return (report_data)