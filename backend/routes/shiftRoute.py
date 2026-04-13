from services.reportShiftService import report_service
from flask import Blueprint, jsonify, session

report_bp = Blueprint("report",__name__)

@report_bp.route("/shiftreport",methods = ["POST"])
def main():
    id_enterprise = session["id_enterprise"]
    response = report_service(id_enterprise)

    return jsonify(response),200
