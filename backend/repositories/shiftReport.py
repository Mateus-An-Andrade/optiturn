from db.connection import get_db_connection

def createReportShift():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
        SELECT operator_id, activity_id, status, create_date
        FROM production
        WHERE create_date >= CURRENT_DATE
        AND create_date < CURRENT_DATE + INTERVAL '1 day'
    ''')
    report_data = cursor.fetchall()

    cursor.close()
    print(report_data)
    return (report_data)