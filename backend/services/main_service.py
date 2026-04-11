def get_main_data(session):
    name = session.get('name')
    shift = session.get('shift')
    id = session.get('id')
    id_enterprise = session.get('id_enterprise')
    type_acess = session.get('type_acess')

    if not name:
        return None
    
    return{
        "name": name,
        "shift": shift,
        "id": id,
        "id_enterprise": id_enterprise,
        "type_access": type_acess
    }
