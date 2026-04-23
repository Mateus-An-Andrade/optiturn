from repositories.register_operator import register_operator_db

def register_operator_svc(name,user,password,direct_manager,id_enterprise,type_access,shift_work):
    if not all([name,user,password,direct_manager]):
        return{"error":"ERRO: M1549145OT. Campos com informações não preenchidas, tente novamente!"},400
    
    

    register_operator_db(name, user, password, direct_manager,id_enterprise,type_access,shift_work)
    
    return {
            "status": "success",
            "message": "Novo operador cadastrado com sucesso"
            },201
    