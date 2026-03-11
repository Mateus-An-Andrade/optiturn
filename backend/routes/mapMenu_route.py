from flask import jsonify, request, Blueprint
from services.MapService import dataMap

map_bp = Blueprint ("map",__name__)

@map_bp.route("/map_menu", methods = ["POST"])
def map():
      dataForMap = dataMap()

      return jsonify(dataForMap)