from db.connection import get_db_connection

def register_operator_db(name,direct_manager):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''INSERT INTO operador (name,direct_manager) VALUES (%s,%s)''', (name, direct_manager))

    conn.commit()
    cursor.close()
    conn.close()

    return ("novo Operador cadastrado com sucesso")

                                                                    #acima temos a informação que o sistema recebe: cadastro dos operadores. Ele deve receber: nome. O turno em que trabalha é automaticamente associado ao gestor que o cadastra, ou seja, se o gestor que o cadastrou é do turno T1 então o operador é da manhã. Ao receber as informações do front-end ele deve inseri-las no banco de dados
