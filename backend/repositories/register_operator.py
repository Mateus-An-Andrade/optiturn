from db.connection import get_db_connection

def register_operator_db(name, user, password, direct_manager,id_enterprise,type_acess,shift_work):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''INSERT INTO user_systems(
                        name,
                        user_name, 
                        password,
                        direct_manager,
                        id_enterprise,
                        type_acess,
                        shift)
                   
                        VALUES (%s,%s,%s,%s,%s,%s,%s)''', (name, user, password, direct_manager,id_enterprise,type_acess,shift_work))

    conn.commit()
    cursor.close()
    conn.close()

    return ("novo Operador cadastrado com sucesso"),201

                                                                    #acima temos a informação que o sistema recebe: cadastro dos operadores. Ele deve receber: nome. O turno em que trabalha é automaticamente associado ao gestor que o cadastra, ou seja, se o gestor que o cadastrou é do turno T1 então o operador é da manhã. Ao receber as informações do front-end ele deve inseri-las no banco de dados
