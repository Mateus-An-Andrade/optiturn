from repositories.auth_user import auth_user_credentials
import psycopg2.extras

def login_user(username,password):
    user = auth_user_credentials(username,password)

    if not user:
        return None
    
    return {
            "id": user["id_gestor"],
            "name": user["name"],
            "turn": user["turn"]
    }
