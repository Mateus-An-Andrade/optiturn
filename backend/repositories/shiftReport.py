from db.connection import get_db_connection

def createReportShift():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''SELECT operator_id, activity_id, status, create_date FROM production''')

    report_data = cursor.fetchall()

    cursor.close()
    
    return (report_data)