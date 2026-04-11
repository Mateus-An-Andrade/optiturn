from flask import Blueprint, jsonify,request,session
from services.register_gestor_service import register_gestor

user_bp = Blueprint("user", __name__)

@user_bp.route("/register/manager", methods = ["POST"])
def register_manager():
    data = request.get_json()
    print(data)
    name = data.get("name")
    id_enterprise= session.get("id_enterprise")
    type_acess = data.get("type")
    username = data.get("user")
    password = data.get("password")
    turn = data.get("turn")
  
    response, status = register_gestor(name,username,password,turn,id_enterprise,type_acess)

    return jsonify(response),status
