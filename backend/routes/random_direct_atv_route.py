from flask import Blueprint, jsonify,request
from services.random_direct_atv_svc import randon_direction_act_svc


act_random = Blueprint("random_direct", __name__)

@act_random.route("/direction/random" , methods = ["POST"])
def randon_direction_act_route():
    response = randon_direction_act_svc()

    return jsonify(response),200