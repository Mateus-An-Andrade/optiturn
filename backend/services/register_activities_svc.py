from repositories.register_activities import register_activities_in_db

def register_activities_svc(title,discreption,importance,created_by):
    if not all([title,discreption,importance,created_by]):
        raise ValueError("ERRO: M1549145OT. Campos com informações não preenchidas, tente novamente!")
    
    register_activities_in_db(title,discreption,importance,created_by)

    return {
            "status": "success",
            "message": "Nova tarefa criada com sucesso"
            }   

                                                                        #Aima temos a regra de negocio, aqui o algoritmo recebe da rota as informações que chegaram do front-end, e informa ao banco de dados tudo o que chegou e caso o usuário esqueça de informar algum campo ele é avisado via console inicialmente