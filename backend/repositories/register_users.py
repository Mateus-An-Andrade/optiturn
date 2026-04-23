from db.connection import get_db_connection

def register_gestor_db(name,new_user,password,turn,id_enterprise,type_access):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''INSERT INTO user_systems(
                   name,
                   user_name,
                   password,
                   shift,
                   id_enterprise,
                   type_access) 
                   VALUES(%s,%s,%s,%s,%s,%s)''',(name,new_user,password,turn,id_enterprise,type_access))
    
                                                                #acima temos as primeiras informações que o sistema recebe: cadastro dos gestores. Ele deve receber: nome, usuário, turno em que trabalha e senha. Ao receber as informações do front-end ele deve inseri-las no banco de dados

    conn.commit()
    cursor.close()
    conn.close()

    return ("novo Gestor cadastrado com sucesso"),201