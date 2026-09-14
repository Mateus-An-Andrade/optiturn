from repositories.permanentDemand import permanentDemand

def permanentDemandService(title,description,importance,createdBy,idEnterprise,PermanentDemand):
    resultDemands = permanentDemand(title,description,importance,createdBy,idEnterprise,PermanentDemand)
    
    return resultDemands
                                                                    #recebimento de demandas ciclicas
