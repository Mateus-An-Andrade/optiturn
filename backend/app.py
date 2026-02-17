
import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.auth_routes import auth_bp
from routes.route_main import main_bp
from routes.register_gestor_route import user_bp
from routes.register_operator_route import user_op 

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
                                                       
#===================================================================================================================================================


#Algoritmo para página principal da página:



#===================================================================================================================================================

@app.route("/ping")
def ping():
    return {"status": "ok"}


#@app.route("/register_operator", methods = ["POST"])
#def register_operator():
#
#    if request.method == "POST":
#        data = request.get_json()
#
#        name = data.get('name_operator')
#        fixed_op = data.get('fixed_op', False)
#
#       
#        fixed_shift = True if fixed_op else False
#        temporary = not fixed_shift  
#
#        conn = get_db_connection()
#        cursor= conn.cursor()
#
#        cursor.execute(''' INSERT INTO operador (name, fixed_shift, temporary) values (%s,%s,%s)
#                       ''', (name,fixed_op,temporary))
#        
#        conn.commit()
#        cursor.close()
#        conn.close()
#
#        return jsonify("novo Operador cadastrado com sucesso")
#
##================================================================================================================#====================
#
#@app.route("/create_activity",methods = ["POST"])
#def create_activity():
#    if request.method == "POST":
#        data = request.get_json()
#
#        title_task = data.get('title_task_created')
#        descreption_task = data.get('descreption_task_text')
#        importance_task = data.get('importance_task')
#
#   
#                                                                            #acima o algoritmo: defini o method #post como metodo para receber o JSON #do front end, para trabalhar com ele #no banco de dados, pegando os dados #necessarios para a entrada na base
#        priority_map = {
#            "PRIORIDADE MÁXIMA": 1,
#            "SEGUNDO PLANO": 2,
#            "PRIORIDADE BAIXA": 3
#        }
#
#        importance_value = request.form.get('importance')
#        importance_task = priority_map.get(importance_value, 3)
#        conn= get_db_connection()
#        cursor = conn.cursor()
#
#        cursor.execute('''INSERT INTO public.activities (title, descreption, importance, in_production)
#                                values (%s,%s,%s,%s)
#                        RETURNING id_activities''',
#                        (title_task,descreption_task,importance_task, False))
#                # Pega o ID gerado
#        activity_id = cursor.fetchone()[0]
#
#        cursor.execute('''INSERT INTO public.turn (activities_id,title, descreption, importance, status)
#                       values (%s,%s,%s,%s,%s)''',
#                        (activity_id, title_task,descreption_task,importance_task, 'Pendente'))
#
#                
#
#        conn.commit()
#        cursor.close()
#        conn.close()
#
#        return jsonify("Nova tarefa criada e pronta para ser direcionada")
#
##================================================================================================================#====================
#
#@app.route("/production_menu_random_direct", methods = ["POST"])
#def direction_activity():
#
#    if request.method == "POST":
#        conn = get_db_connection()
#        cursor = conn.cursor()
#
#        cursor.execute(''' SELECT * FROM activities WHERE in_production = FALSE''')
#
#        data= cursor.fetchall()
#
#        tasks = []
#        operators = []
#        assigniments = []
#                                                                                    #lista de tarefas e #operadores para enviar ao #front
#        for activity in data:
#            id_task = activity[0]
#            title = activity[1]
#            descreption = activity[2]
#            importance = activity[3]
#
#            tasks.append ({'id':id_task, 'titulo': title, 'descrição': descreption, 'importancia': importance })
#
#                                                                                    #acima o algoritmo está #pegando todas as tarefas #criadas no banco de dados e #criando um JSON
#        cursor.execute('''SELECT * FROM operador''')
#        op_data = cursor.fetchall()
#
#        for worker in op_data:
#            id_op= worker[0]
#            name_op = worker[1]
#
#            operators.append({'id':id_op, 'name': name_op})
#
#                                                                                    #acima temos o algoritmo #pegado os operadores #cadastrados no banco de #dados e acrescentado a uma #lista 
#
#
#        for tarefa in tasks:
#            operator_sorted = random.choice(operators)
#
#            assigniments.append({"id_task": tarefa['id'], "title":tarefa['titulo'], "id_operator": #operator_sorted['id'],'nome_operador': operator_sorted['name'], 'importancia': importance,})
#
#                                                                                    #acima o algoritmo está #pegando cada tarefa que foi #criada, acrescentada a lista #e escolhendo um operador de #modo aleatório para realizar #a tarefa.
#
#        if request.method == "POST":
#            refresh_tasks = request.json.get('refresh', False)
#            confirmation_manager = request.json.get('confirm_production', False)
#
#            data_tasks = request.json.get("data_task")
#
#            if refresh_tasks and not confirmation_manager:
#                new_refresh = []
#                for tarefa in tasks:
#                    operator_sorted = random.choice(operators)
#
#                    new_refresh.append({"id_task": tarefa['id'], "title":tarefa['titulo'], "id_operator": #operator_sorted['id'],'nome_operador': operator_sorted['name'], 'importancia': importance,})
#                
#                return jsonify(new_refresh)
#            
#
#            elif confirmation_manager and not refresh_tasks:
#                data_register = data_tasks
#                for line in data_register:
#                    cursor.execute('''
#                        INSERT INTO production (
#                            operator_id,
#                            activity_id,
#                            status
#                        ) VALUES (%s, %s, %s)
#                    ''', (line['id_operator'], line['id_task'], 'pendente'))
#
#                    cursor.execute('''UPDATE activities SET in_production = TRUE 
#                                        WHERE id_activities = %s''', (line['id_task'],))
#
#                conn.commit()
#                cursor.close()
#                conn.close()
#                return jsonify("Tarefas registradas na base de dados")
#
#                                                                                #acima o sistema está refazendo #o sorteio de modo aleatório e #enviando ao front end essa #informação e se o gestor #confirmar ele pega cada #informação do json e insere no #banco de dados para consultas #posteriores e para o Map_Menu.
#
#        return jsonify(assigniments)
#    
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