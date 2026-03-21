from services.reportShiftService import report_service
from flask import Blueprint, jsonify, request

report_bp = Blueprint("report",__name__)

@report_bp.route("/shiftreport",methods = ["POST"])
def main():
    response = report_service()

    return jsonify(response),200
