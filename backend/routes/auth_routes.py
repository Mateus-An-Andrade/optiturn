from flask import Blueprint, request, jsonify, session
from services.auth_user import login_user
import psycopg2.extras



auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login",methods = ["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    id_enterprise = 0
    type_acess = 0
    psycopg2.extras.RealDictCursor

    user = login_user(username,password,id_enterprise,type_acess)
    print("USER TYPE:", type(user))
    print("USER VALUE:", user)

    if not user:
        return jsonify({"status":"error",
                        "message": "Usuário ou senha inválidos"
                        }),401
    

    session["id"] = user["id"]
    session["name"] = user["name"]
    session["shift"] = user["shift"]
    session["id_enterprise"] = user["id_enterprise"]
    session["type_acess"] = user["type_acess"]

    return jsonify({
        "status": "sucess",
        "name": user["name"],
        "shift": user["shift"],
        "id_enterprise": user["id_enterprise"],
        "type_acess": user["type_acess"]
    }),200
    

