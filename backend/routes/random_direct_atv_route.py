from flask import Blueprint, jsonify,request
from services.random_direct_atv_svc import randon_direction_act_svc, confirmDirectionService


act_random = Blueprint("random_direct", __name__)
act_random_confirm = Blueprint("confirm_random_direct", __name__)


@act_random.route("/direction/random" , methods = ["POST"])
def randon_direction_act_route():
    response = randon_direction_act_svc()

    return jsonify(response),200




@act_random_confirm.route("/confirm/direction/random", methods = ["POST"])
def confirmDirectionSort():
    data = request.get_json()
    confirm = data.get("confirm_production")
    sorted_data= data.get("sorted")
    
    confirmDirectionService(sorted_data)

    return jsonify(sorted_data),200

                                                            #acima a rota de confirmação do sorteio, quando o usuário confirma o sorteio realizado o algorito deve pegar o JSON e invocar o service que por sua vez deve invocar os repositories.