from flask import jsonify, request, Blueprint
from services.MapService import dataMap, confirmTaskFinish

map_bp = Blueprint ("map",__name__)
map_confirm_task = Blueprint ("mapConfirm",__name__)

@map_bp.route("/map_menu", methods = ["POST"])
def map():
      dataForMap = dataMap()

      return jsonify(dataForMap)
                                                                                    #Rota de envio de dados ao front-end para criar os quadros de operadores.
#================================================================================================================

@map_confirm_task.route("/mapConfirm",methods = ["POST"])
def confirmDataMap():
      id_confirmed = request.get_json()["activity_id"]
      confirmTaskFinish(id_confirmed)

      return jsonify("Tarefa Concluida: Relátorio de turnos atualizado")