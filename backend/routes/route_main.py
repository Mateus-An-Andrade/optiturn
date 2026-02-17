from flask import Blueprint, session, jsonify
from services.main_service import get_main_data

main_bp = Blueprint("main",__name__)

@main_bp.route("/main",methods = ["POST"])
def main():
    data = get_main_data(session)

    if not data:
        return jsonify({"status":"erro",
                        "message":"usuário não logado"}),401
    
    return jsonify({"status": "success", **data}), 200


                                                                        #Acima a rota faz a alteração dinamica apresentando o nome e turno do gestor atualmente logado.