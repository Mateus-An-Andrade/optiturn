
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
        SESSION_COOKIE_SAMESITE="Lax", 
        SESSION_COOKIE_SECURE=False        
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


##================================================================================================================#====================
#
#@app.route("/production_menu_specific_direction", methods = ["POST"])
#def specific_direction():
#
#    if request.method == "POST":
#
#        activities_specifics = []
#
#        operators_in_production = []
#
#        conn = get_db_connection()
#        cursor = conn.cursor()
#                                                                                #acima temos a função de #direcionamento especifico caso o #gestor prefira ele mesmo #direcionar qual operador deve #realizar uma tarefa. A #requisição sendo feita em POST, #o algoritimo deverá estabelecer #a conexão com a base de dados e #selecionar todas as atividades #para acrescentar a lista #activities_specifics
#        cursor.execute('''SELECT * FROM activities''')
#        activities_data = cursor.fetchall()
#
#        for activity in activities_data:
#            id_task = activity[0]
#            title = activity[1]
#            description = activity[2]
#            importance = activity[3]
#
#            activities_specifics.append({"id": id_task,"title": title,"description": description,"importance": #importance})
#
#
#        cursor.execute('''SELECT * FROM operador''')
#        operator_in_db = cursor.fetchall()
#
#        for operator in operator_in_db:
#            id_op= operator[0]
#            name_op = operator[1]
#
#            operators_in_production.append({'id':id_op, 'name': name_op})
#
#
#        return jsonify([activities_specifics,operators_in_production])
#    
#
##================================================================================================================#====================
#
#
#@app.route("/map_menu", methods = ["POST"])
#def map():
#    
#    if request.method == "POST":
#        conn= get_db_connection()
#        cursor = conn.cursor(cursor_factory=DictCursor)
#
#
#        button_pause_clicked = request.json.get("button_pause_clicked")  
#        
#        button_complete_clicked = request.json.get("button_complete_clicked")
#
#        activity_id_status = request.json.get("activity_id")
#        activity_id = request.json.get("activity_id")
#        title_activity = request.json.get("title_activity")
#        description_activity = request.json.get("description_activity")
#        operator_id = request.json.get("operator_id")
#        importance = request.json.get("importace")
#        name_operator_complete = request.json.get("name_operator")
#
#        button_confirm_realocation_clicked = request.json.get("button_confirm_realocation_clicked")
#        new_operator_for_task_id = request.json.get("new_operator_for_task_id")
#            
#        if button_pause_clicked == True:
#            cursor.execute('''UPDATE production SET status = 'Pendente' WHERE activity_id = %s''', #(activity_id_status,))
#            conn.commit()
#           
#            return jsonify({"mensagem": "status da tarefa alterado"})
#
#        elif button_pause_clicked == False:
#            cursor.execute('''UPDATE production SET status = 'Em andamento' WHERE activity_id = %s''', #(activity_id_status,))
#            conn.commit()
#
#            return jsonify({"mensagem": "status da tarefa alterado"})
#        
#
#        elif button_complete_clicked == True:
#            cursor.execute('''UPDATE production SET status = 'Concluida' WHERE activity_id = %s''', #(activity_id_status,))
#            
#            cursor.execute('''UPDATE turn SET status = 'Concluida' WHERE activities_id = %s''', #(activity_id_status,))
#
#
#            cursor.execute('''DELETE FROM production WHERE status = 'Concluida' ''')
#
#            conn.commit()
#        
#            return jsonify({"mensagem": "tarefa concluida"})
#        
#
#
#        elif button_confirm_realocation_clicked == True:
#            cursor.execute('''UPDATE production SET operator_id = %s WHERE activity_id = %s''',#(new_operator_for_task_id,activity_id,) )
#
#        
#                                                            #acima temos a rota do menu MAPA, a conexão deve ser #por padrão POST, se for POST o algoritmo deverá #criar uma conexão com o banco de dados,verificar se #o botão de pausar uma tarefa foi ou não clicado, da #mesma forma um botão de concluir foi ou não clicado, #se nenhum foi clicado ele deverá enviar as tarefas #abaixo. Se foi clicado então ele pode altera o #status para em andamento, pendente, ou concluida. Se #o gestor confirmar a conclusão da tarefa, o sistema #deverá alterar o status da tarefa tanto na tabela #production apagando imediatamente para que a mesma #não atrapalhe as que ainda estão em produção, e #inserir os mesmos dados na tabela de historico de #produção, para futuras analises de dados.
#                                                            
#
#
#
#        data_activity_status_op = []
#
#        cursor.execute('''
#                SELECT 
#                    p.operator_id,
#                    o.name,
#                    p.activity_id,
#                    p.status,
#                    a.title,
#                    a.descreption,
#                    a.importance
#                FROM production p
#                JOIN operador o ON p.operator_id = o.id_operador
#                JOIN activities a ON p.activity_id = a.id_activities
#            ''')
#        data_for_map = cursor.fetchall()
#
#        cursor.close()
#        conn.close()
#                                                                    #acima o algoritmo deve criar uma lista #vazia e selecionar tudo da tabela produção, #fazer uma junção com os IDs correspondentes #em activities e em operador, pegar todo o #resultado e colocar na variavel data_for_map.
#
#        for line_data in data_for_map :
#
#            data_activity_status_op.append({"operator_id": line_data["operator_id"], 
#                                            "name_operator": line_data["name"], 
#                                            "activity_id": line_data["activity_id"],
#                                            "title_activity": line_data["title"],
#                                            "description_activity": line_data["descreption"],
#                                            "status_activity": line_data["status"],
#                                            "importance_activity": line_data["importance"]
#                                            })
#
#
#                                                                    #acima com os dados na variavel #data_for_map, o algoritmo percorre toda a #variavel, e insere os dados que foram #resgatados da base de dados e insere em #variaveis especificas dados especificos #como: id e descrição das tarefas, nome e id #dos operadores, além do proprio status da #atividade. E com isso ele cria um JSON para #enviar para o front-end.
#
#        return jsonify(data_activity_status_op) 
#
#
#
##================================================================================================================#====================
#
#@app.route("/turn_menu", methods = ["POST"])
#
#def turn_menu():
#
#    if request.method == "POST":
#
#        confirm_demand = request.json.get("confirm_demand",False)
#        conn = get_db_connection()
#        cursor = conn.cursor()
#
#        data_turn_report = []
#
#        id_gestor = session['id']
#        name_gestor = session['name']
#        turn_demand = session['turn']
#
#        cursor.execute('''SELECT * FROM turn''')
#        data_turn_db = cursor.fetchall()
#
#        for line in data_turn_db:
#            activity_id = line[0]
#            title = line[1]
#            description= line[2]
#            importance = line[3]
#            status = line[4]
#
#            data_turn_report.append({"activity_id": activity_id,
#                                     "title": title,
#                                     "description": description,
#                                     "importance": importance,
#                                     "status": status
#                                    })
#        
#
#
#        if confirm_demand == True:
#        
#            cursor.execute('''
#                            INSERT INTO history_production(
#                                activity_id,
#                                title_activity,
#                                description,
#                                importance,
#                                status,
#                                operator_id,
#                                name_operator,
#                                id_gestor,
#                                name_gestor,
#                                turn_demand,
#                                date
#                            )
#                            SELECT 
#                                a.id_activities,
#                                a.title,
#                                a.descreption,
#                                a.importance,
#                                CASE
#                                    WHEN t.status = 'Concluida' THEN 'Concluida'
#                                    WHEN t.status = 'Pendente' THEN 'Pendente'
#                                    ELSE p.status
#                                END AS status,
#                                o.id_operador,
#                                o.name,
#                                %s, 
#                                %s,  
#                                %s,  
#                                NOW()
#                            FROM production p
#                            JOIN activities a ON p.activity_id = a.id_activities
#                            JOIN operador o ON p.operator_id = o.id_operador
#                            JOIN turn t ON t.activities_id = a.id_activities
#                            WHERE p.turn = %s
#                            AND LOWER(p.status) IN ('pendente', 'concluida')
#                                    ''', (id_gestor, name_gestor, turn_demand, turn_demand))
#                                                                        
#            cursor.execute('''
#                                UPDATE activities
#                                SET in_production = FALSE
#                                WHERE id_activities IN (
#                                    SELECT activity_id FROM production WHERE turn = %s
#                                )
#                            ''', (turn_demand,))
#
#            cursor.execute('DELETE FROM production WHERE turn = %s AND status = %s', (turn_demand, 'Concluida'))
#
#
#            cursor.execute('DELETE FROM turn WHERE status = %s', ('Concluida',))
#            
#
#            conn.commit() 
#            cursor.execute('''SELECT * FROM turn''')
#            result_demand = cursor.fetchall()
#
#            return jsonify(result_demand)
#        
#        return jsonify(data_turn_report)
#    
#                                                                    #Acima o algoritmo deve faz a gravação na #tabela histórico, ou seja, o turno que #deixou tarefas pendentes ou concluidas, será #gravado, o gestor e operadores do turno, #isso para futuras analises de dados.
#
if __name__ == '__main__':
    app.run(debug=True,use_reloader=False)