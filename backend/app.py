import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.auth_routes import auth_bp
from routes.route_main import main_bp
from routes.register_gestor_route import user_bp
from routes.register_operator_route import user_op
from routes.register_activities_route import user_act
from routes.random_direct_atv_route import act_random
from routes.specific_direction_route import act_specific, act_specific_confirm
from routes.random_direct_atv_route import act_random_confirm
from routes.mapMenu_route import map_bp,map_confirm_task
from routes.shiftRoute import report_bp

load_dotenv()


  # carrega o .env apenas se existir localmente, sem forçar caminho
print("🌐 Banco atual:", os.getenv("DB_NAME"))
print("👤 Usuário atual:", os.getenv("DB_USER"))


def create_app():
    app = Flask(__name__)

    app.secret_key = 'uma_chave_bem_secreta_e_estavel'

    app.config.update(
        SESSION_COOKIE_SAMESITE="None", 
        SESSION_COOKIE_SECURE=True        
    )

    origins = [
            "https://optiturnsys.vercel.app",
            "http://localhost:5500",
            "http://127.0.0.1:5500"
        ]

    CORS(
        app,
        supports_credentials=True,
        origins=origins,
        allow_headers=["Content-Type"],
        methods=["GET", "POST", "OPTIONS"]
    )


    return app


app = create_app()
app.register_blueprint(auth_bp)
app.register_blueprint(main_bp)
app.register_blueprint(user_bp)
app.register_blueprint(user_op)
app.register_blueprint(user_act)
app.register_blueprint(act_random)
app.register_blueprint(act_specific)
app.register_blueprint(act_specific_confirm)
app.register_blueprint(act_random_confirm)
app.register_blueprint(map_bp)
app.register_blueprint(map_confirm_task)
app.register_blueprint(report_bp)
                                                       
#===================================================================================================================================================

@app.route("/ping")
def ping():
    return {"status": "ok"}


if __name__ == '__main__':
    app.run(debug=True,use_reloader=False)