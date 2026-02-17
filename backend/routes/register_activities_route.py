from flask import Blueprint, jsonify,request,session
from services.register_activities_svc import register_activities_svc

user_act = Blueprint("acts", __name__)

@user_act.route("/create/activity", methods = ["POST"])
def create_activity():
    data= request.get_json()
    title = data.get("title_task_created")
    discreption = data.get("descreption_task_text")
    importance = data.get("importance_task")
    created_by = session["id"]

    response = register_activities_svc(title,discreption, importance, created_by)

    return jsonify(response),200

                                                                        #Acima o código faz o recebimento do JSON do front-end e faz a comunicação com o SVC informando o titulo, descrição, importancia e por quem foi criada a tarefa.