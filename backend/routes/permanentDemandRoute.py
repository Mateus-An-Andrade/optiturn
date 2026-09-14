from flask import Blueprint, jsonify,request,session
from services.permanentDemandService import permanentDemandService

functionPD = Blueprint("pd",__name__)

@functionPD.route("/create/permanentActivity", methods = ["POST"])
def permanentDemandFunction():

    data= request.get_json()

    title = data.get("title")
    description = data.get("description")
    importance = data.get("importance")
    createdBy = data.get("createdBy")
    idEnterprise = data.get("idEnterprise")
    PermanentDemand = data.get("PermanentDemand")

    response = permanentDemandService(title,description,importance,createdBy,idEnterprise,PermanentDemand)

    return jsonify(response)

                                                                            #envio de demandas para o front-end