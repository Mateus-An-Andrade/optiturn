from flask import jsonify, request, Blueprint,session
from services.MapService import dataMap, confirmTaskFinish, mapProductionStatus

map_bp = Blueprint ("map",__name__)
map_confirm_task = Blueprint ("mapConfirm",__name__)
mapProd = Blueprint("map_production",__name__)

@map_bp.route("/map_menu", methods = ["POST"])
def map():
      dataForMap = dataMap()

      return jsonify(dataForMap)
                                                                                    #Rota de envio de dados ao front-end para criar os quadros de operadores.
#================================================================================================================

@map_confirm_task.route("/mapConfirm",methods = ["POST"])
def confirmDataMap():
      id_confirmed = request.get_json()["activity_id"]
      id_enterprise = session["id_enterprise"]
      confirmTaskFinish(id_confirmed,id_enterprise)

      return jsonify("Tarefa Concluida: Relátorio de turnos atualizado")

@mapProd.route("/mapProduction", methods = ["POST"])
def mapProduction():
      id_task = request.get_json()["activity_id"]
      id_enterprise = session["id_enterprise"]
      status= request.get_json()["status"]
      
      mapProductionStatus(id_task,id_enterprise,status)

      return jsonify("Tarefa atualizada:",status)