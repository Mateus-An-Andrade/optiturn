from repositories.register_operator import register_operator_db

def register_operator_svc(name,manager_id):
    if not name:
        raise ValueError("ERRO: M1549145OT. Campos com informações não preenchidas, tente novamente!")
    

    register_operator_db(name, manager_id)
    return {
            "status": "success",
            "message": "Novo operador cadastrado com sucesso"
            }
    