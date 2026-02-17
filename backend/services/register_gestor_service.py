from repositories.register_users import register_gestor_db

def register_gestor(name,username,password,turn):
    if not all([name,username,password,turn]):
        raise ValueError("ERRO: M1549145OT. Campos com informações não preenchidas, tente novamente!")
    
    print("ENTROU NO SERVICE REGISTER")

    register_gestor_db(name,username,password,turn)

    
    return {
            "status": "success",
            "message": "Novo gestor cadastrado com sucesso"
            }