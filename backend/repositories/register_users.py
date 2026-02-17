from db.connection import get_db_connection

def register_gestor_db(name,new_user,password,turn):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''INSERT INTO gestor(
                   name,
                   username,
                   password,
                   turn) 
                   VALUES(%s,%s,%s,%s)''',(name,new_user,password,turn))
    
                                                                #acima temos as primeiras informações que o sistema recebe: cadastro dos gestores. Ele deve receber: nome, usuário, turno em que trabalha e senha. Ao receber as informações do front-end ele deve inseri-las no banco de dados

    conn.commit()
    cursor.close()
    conn.close()

    return ("novo Gestor cadastrado com sucesso")