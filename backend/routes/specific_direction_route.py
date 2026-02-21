from services.specific_direct_svc import specific_direction_svc
from flask import Blueprint, jsonify, request

act_specific = Blueprint("specific_direct", __name__)

@act_specific.route("/direction/specific", methods = ["POST"])
def specific_direction_route():
    response = specific_direction_svc()

    return jsonify(response),200