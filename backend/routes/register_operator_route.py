from flask import Blueprint, jsonify,request,session
from services.register_operator_svc import register_operator_svc

user_op = Blueprint("users", __name__)

@user_op.route("/register/operator", methods=["POST"])
def register_operator():
    data = request.get_json()
    print(data)
    
    name = data.get("name")
    direct_manager = session.get("id")
    id_enterprise= session.get("id_enterprise")
    shift_work = session.get("shift")
    user = data.get("user")
    type_acess= data.get("type")
    password = data.get("password")

    response, status = register_operator_svc(name, user, password, direct_manager,id_enterprise,type_acess,shift_work)
    return jsonify(response),status    