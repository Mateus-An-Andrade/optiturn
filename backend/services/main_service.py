def get_main_data(session):
    name = session.get('name')
    turn = session.get('turn')
    id = session.get('id')

    if not name:
        return None
    
    return{
        "name": name,
        "turn": turn,
        "id": id
    }
