from services.specific_direct_svc import specific_direction_svc
from repositories.specific_direction import confirmSpecifcDirect
from flask import Blueprint, jsonify, request,session

act_specific = Blueprint("specific_direct", __name__)
act_specific_confirm = Blueprint("specific_direct_confirm",__name__)


@act_specific.route("/direction/specific", methods = ["POST"])
def specific_direction_route():
    id_enterprise = session["id_enterprise"]
    response = specific_direction_svc(id_enterprise)

    return jsonify(response),200


@act_specific_confirm.route("/direction/specific/confirm", methods = ["POST"])
def specific_direction_confirm():
    response = request.get_json()
    id_enterprise = session["id_enterprise"]
    confirmSpecifcDirect(response,id_enterprise)
    return jsonify({"msg": "Direcionamento realizado"}), 200