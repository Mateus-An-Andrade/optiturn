from flask import Blueprint, jsonify,request,session
from services.register_operator_svc import register_operator_svc

user_op = Blueprint("users", __name__)

@user_op.route("/register/operator", methods=["POST"])
def register_operator():
    data = request.get_json()
    name= data.get("name_operator")
    direct_manager = session["id"]

    response = register_operator_svc(name,direct_manager)

    return jsonify(response),200