from flask import Blueprint, jsonify,request
from services.register_gestor_service import register_gestor

user_bp = Blueprint("user", __name__)

@user_bp.route("/register/manager", methods = ["POST"])
def register_manager():
    data = request.get_json()
    name = data.get("name")
    username = data.get("user")
    password = data.get("password")
    turn = data.get("turn")

    response = register_gestor(name,username,password,turn)

    return jsonify(response), 201
