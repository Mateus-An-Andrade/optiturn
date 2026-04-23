from repositories.auth_user import auth_user_credentials
import psycopg2.extras

def login_user(username,password, id_enterprise, type_access):
    user = auth_user_credentials(username,password)

    if not user:
        return None
    
    return {
            "id": user["id_user"],
            "name": user["name"],
            "id_enterprise": user["id_enterprise"],
            "shift": user["shift"],
            "type_access": user["type_access"]

    }
