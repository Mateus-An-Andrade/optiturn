import os
import psycopg2
from psycopg2.extras import RealDictCursor
import random
from flask import Flask, render_template, request, redirect, session, url_for, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from pathlib import Path


load_dotenv()  # carrega o .env apenas se existir localmente, sem forçar caminho
print("🌐 Banco atual:", os.getenv("DB_NAME"))
print("👤 Usuário atual:", os.getenv("DB_USER"))


DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL:
    print("🔍 DATABASE_URL carregado com sucesso.")
else:
    print("⚠️ DATABASE_URL não encontrada. Verifique seu arquivo .env.")


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, '..', 'Front-end')


app = Flask(__name__)

app.secret_key = 'uma_chave_bem_secreta_e_estavel'

CORS(
    app, 
    supports_credentials=True, 
    origins=["https://optiturnsys.vercel.app"],
    allow_headers=["Content-Type"],          
    methods=["GET","POST","OPTIONS"]   
     )

def get_db_connection():
    if not DATABASE_URL:
        raise Exception("Variável DATABASE_URL não configurada no ambiente.")
    try:
        conn = psycopg2.connect(DATABASE_URL, sslmode="require")
        return conn
    except Exception as e:
        print(f"❌ Erro ao conectar ao banco: {e}")
        raise e



                                                            # Nesta seção temos a configuração de conexão com a base de dados, ele está configurado para pegar as informações do endereço da base de dados (ou o host) assim como as informações da senha, nome de usuário, o nome do banco de dados. A chave secreta que valida as sessões foi definida também nessa seção.
#===================================================================================================================================================


#Algoritmo para página principal da página:

@app.route('/login', methods=['GET', 'POST'])
def index():
        data = request.get_json()  # ✅ Recebe JSON do fetch
        username = data.get('username')
        password = data.get('password')

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('''SELECT * FROM gestor WHERE username = %s AND password = %s''', (username, password,))
        user_log = cursor.fetchone()

        print("📌 Resultado do login:", user_log)  

        if user_log:
            session['name'] = user_log[1]
            session['turn'] = user_log[4]

            response = jsonify({
                "status": "success",
                "name": user_log[1],
                "turn": user_log[4]
            })

            return response, 200
        else:
            cursor.close()
            conn.close()

            return jsonify({
            "status": "error",
            "message": "Usuário ou senha inválidos"
        }), 401
                                                                        #Acima a rota faz a requisição das informações do usuário, login e senha, faz a busca no banco de dados e com isso ele deve guardar as informações correspondentes em uma session.

@app.route("/main", methods = ['GET','POST'])
def main():
    print("Sessão atual:", dict(session))
    name = session.get('name')
    turn = session.get('turn')

    if not name:
        return jsonify({"status": "error", "message": "Usuário não logado"}), 401

    return jsonify({"status": "success", "name": name, "turn": turn}), 200

                                                                        #Acima a rota faz a alteração dinamica apresentando o nome e turno do gestor atualmente logado.
#===================================================================================================================================================


@app.route('/register_gestor', methods = ['POST'])
def register_gestor():

    if request.method == "POST":
        data = request.get_json()

        name = data.get('name')
        user = data.get('user')
        turn = data.get('turn')
        password = data.get('password')
                                                                        #acima temos as primeiras informações que o sistema recebe: cadastro dos gestores. Ele deve receber: nome, usuário, turno em que trabalha e senha. Ao receber as informações do front-end ele deve inseri-las no banco de dados

        conn = get_db_connection()
        cursor= conn.cursor()

        cursor.execute(''' INSERT INTO gestor (
                                                name,
                                                username,
                                                password,
                                                turn) VALUES (
                                                            %s,
                                                            %s,
                                                            %s,
                                                            %s)''',(name,user,password,turn))


        conn.commit()
        cursor.close()
        conn.close()

        return jsonify("novo Gestor cadastrado com sucesso")

#====================================================================================================================================

@app.route("/register_operator", methods = ["POST"])
def register_operator():

    if request.method == "POST":
        data = request.get_json()

        name = data.get('name_operator')
        fixed_op = data.get('fixed_op', False)

       
        fixed_shift = True if fixed_op else False
        temporary = not fixed_shift  

        conn = get_db_connection()
        cursor= conn.cursor()

        cursor.execute(''' INSERT INTO operador (name, fixed_shift, temporary) values (%s,%s,%s)
                       ''', (name,fixed_op,temporary))
        
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify("novo Operador cadastrado com sucesso")

#====================================================================================================================================

@app.route("/create_activity",methods = ["POST"])
def create_activity():
    if request.method == "POST":
        data = request.get_json()

        title_task = data.get('title_task_created')
        descreption_task = data.get('descreption_task_text')
        importance_task = data.get('importance_task')

   
                                                                            #acima o algoritmo: defini o method post como metodo para receber o JSON do front end, para trabalhar com ele no banco de dados, pegando os dados necessarios para a entrada na base
        priority_map = {
            "PRIORIDADE MÁXIMA": 1,
            "SEGUNDO PLANO": 2,
            "PRIORIDADE BAIXA": 3
        }

        importance_value = request.form.get('importance')
        importance_task = priority_map.get(importance_value, 3)
        conn= get_db_connection()
        cursor = conn.cursor()

        cursor.execute('''INSERT INTO public.activities (title, descreption, importance)
                                values (%s,%s,%s)
                        RETURNING id_activities''',
                        (title_task,descreption_task,importance_task))
                # Pega o ID gerado
        activity_id = cursor.fetchone()[0]

        cursor.execute('''INSERT INTO public.turn (activities_id,title, descreption, importance, status)
                       values (%s,%s,%s,%s,%s)''',
                        (activity_id, title_task,descreption_task,importance_task, 'Pendente'))

                

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify("Nova tarefa criada e pronta para ser direcionada")

#====================================================================================================================================

@app.route("/production_menu_random_direct", methods = ["POST"])
def direction_activity():

    if request.method == "POST":
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(''' SELECT * FROM activities''')

        data= cursor.fetchall()

        tasks = []
        operators = []
        assigniments = []
                                                                                    #lista de tarefas e operadores para enviar ao front
        for activity in data:
            id_task = activity[0]
            title = activity[1]
            descreption = activity[2]
            importance = activity[3]

            tasks.append ({'id':id_task, 'titulo': title, 'descrição': descreption, 'importancia': importance })

                                                                                    #acima o algoritmo está pegando todas as tarefas criadas no banco de dados e criando um JSON
        cursor.execute('''SELECT * FROM operador''')
        op_data = cursor.fetchall()

        for worker in op_data:
            id_op= worker[0]
            name_op = worker[1]

            operators.append({'id':id_op, 'name': name_op})

                                                                                    #acima temos o algoritmo pegado os operadores cadastrados no banco de dados e acrescentado a uma lista 


        for tarefa in tasks:
            operator_sorted = random.choice(operators)

            assigniments.append({"id_task": tarefa['id'], "title":tarefa['titulo'], "id_operator": operator_sorted['id'],'nome_operador': operator_sorted['name'], 'importancia': importance,})

                                                                                    #acima o algoritmo está pegando cada tarefa que foi criada, acrescentada a lista e escolhendo um operador de modo aleatório para realizar a tarefa.

        if request.method == "POST":
            refresh_tasks = request.json.get('refresh', False)
            confirmation_manager = request.json.get('confirm_production', False)

            data_tasks = request.json.get("data_task")

            if refresh_tasks and not confirmation_manager:
                new_refresh = []
                for tarefa in tasks:
                    operator_sorted = random.choice(operators)

                    new_refresh.append({"id_task": tarefa['id'], "title":tarefa['titulo'], "id_operator": operator_sorted['id'],'nome_operador': operator_sorted['name'], 'importancia': importance,})
                
                return jsonify(new_refresh)
            

            elif confirmation_manager and not refresh_tasks :
                data_register = data_tasks
                for line in data_register:
                    cursor.execute('''
                        INSERT INTO production (
                            operator_id,
                            activity_id,
                            status
                        ) VALUES (%s, %s, %s)
                    ''', (line['id_operator'], line['id_task'], 'pendente'))

                conn.commit()
                cursor.close()
                conn.close()
                return jsonify("Tarefas registradas na base de dados")

                                                                                #acima o sistema está refazendo o sorteio de modo aleatório e enviando ao front end essa informação e se o gestor confirmar ele pega cada informação do json e insere no banco de dados para consultas posteriores e para o Map_Menu.

        return jsonify(assigniments)
    
#====================================================================================================================================

@app.route("/production_menu_specific_direction", methods = ["POST"])
def specific_direction():

    if request.method == "POST":

        activities_specifics = []

        operators_in_production = []

        conn = get_db_connection()
        cursor = conn.cursor()
                                                                                #acima temos a função de direcionamento especifico caso o gestor prefira ele mesmo direcionar qual operador deve realizar uma tarefa. A requisição sendo feita em POST, o algoritimo deverá estabelecer a conexão com a base de dados e selecionar todas as atividades para acrescentar a lista activities_specifics
        cursor.execute('''SELECT * FROM activities''')
        activities_data = cursor.fetchall()

        for activity in activities_data:
            id_task = activity[0]
            title = activity[1]
            description = activity[2]
            importance = activity[3]

            activities_specifics.append({"id": id_task,"title": title,"description": description,"importance": importance})


        cursor.execute('''SELECT * FROM operador''')
        operator_in_db = cursor.fetchall()

        for operator in operator_in_db:
            id_op= operator[0]
            name_op = operator[1]

            operators_in_production.append({'id':id_op, 'name': name_op})


        return jsonify(activities_specifics)
    

#====================================================================================================================================


@app.route("/map_menu", methods = ["POST"])
def map():
    
    if request.method == "POST":
        conn= get_db_connection()
        cursor = conn.cursor()


        button_pause_clicked = request.json.get("button_pause_clicked")  
        
        button_complete_clicked = request.json.get("button_complete_clicked")

        activity_id_status = request.json.get("activity_id")
        activity_id = request.json.get("activity_id")
        title_activity = request.json.get("title_activity")
        description_activity = request.json.get("description_activity")
        operator_id = request.json.get("operator_id")
        importance = request.json.get("importace")
        name_operator_complete = request.json.get("name_operator")

        button_confirm_realocation_clicked = request.json.get("button_confirm_realocation_clicked")
        new_operator_for_task_id = request.json.get("new_operator_for_task_id")
            
        if button_pause_clicked == True:
            cursor.execute('''UPDATE production SET status = 'Pendente' WHERE activity_id = %s''', (activity_id_status,))
            conn.commit()
           
            return jsonify({"mensagem": "status da tarefa alterado"})

        elif button_pause_clicked == False:
            cursor.execute('''UPDATE production SET status = 'Em andamento' WHERE activity_id = %s''', (activity_id_status,))
            conn.commit()

            return jsonify({"mensagem": "status da tarefa alterado"})
        

        elif button_complete_clicked == True:
            cursor.execute('''UPDATE production SET status = 'Concluida' WHERE activity_id = %s''', (activity_id_status,))

            cursor.execute('''INSERT INTO history_production (activity_id, 
                                                                title_activity, 
                                                                description, 
                                                                importance, 
                                                                status, 
                                                                operator_id, 
                                                                name_operator) 
                           
                                                                    values (%s,%s,%s,%s, %s,%s,%s)''', 

                                                                (activity_id,
                                                                 title_activity, 
                                                                 description_activity, 
                                                                 importance,
                                                                 'Concluida', 
                                                                 operator_id, 
                                                                 name_operator_complete,))

            cursor.execute('''DELETE FROM production WHERE status = 'Concluida' ''')

            conn.commit()
        
            return jsonify({"mensagem": "tarefa concluida"})
        


        elif button_confirm_realocation_clicked == True:
            cursor.execute('''UPDATE production SET operator_id = %s WHERE activity_id = %s''',(new_operator_for_task_id,activity_id,) )

        
                                                            #acima temos a rota do menu MAPA, a conexão deve ser por padrão POST, se for POST o algoritmo deverá criar uma conexão com o banco de dados,verificar se o botão de pausar uma tarefa foi ou não clicado, da mesma forma um botão de concluir foi ou não clicado, se nenhum foi clicado ele deverá enviar as tarefas abaixo. Se foi clicado então ele pode altera o status para em andamento, pendente, ou concluida. Se o gestor confirmar a conclusão da tarefa, o sistema deverá alterar o status da tarefa tanto na tabela production apagando imediatamente para que a mesma não atrapalhe as que ainda estão em produção, e inserir os mesmos dados na tabela de historico de produção, para futuras analises de dados.
                                                            



        data_activity_status_op = []

        cursor.execute('''SELECT * FROM production 
                                JOIN operador ON production.operator_id = operador.id_operador 
                                JOIN activities ON production.activity_id = activities.id_activities''')
        data_for_map = cursor.fetchall()

        cursor.close()
        conn.close()
                                                                    #acima o algoritmo deve criar uma lista vazia e selecionar tudo da tabela produção, fazer uma junção com os IDs correspondentes em activities e em operador, pegar todo o resultado e colocar na variavel data_for_map.

        for line_data in data_for_map :

            operator_id = line_data[0]
            activity_id = line_data[1]
            status_activity = line_data[2]
            name_operator = line_data[4]
            description_activity = line_data[9]
            title_activity = line_data[8]
            importance_activity = line_data[10]
            

            data_activity_status_op.append({"operator_id": operator_id, 
                                            "name_operator": name_operator, 
                                            "activity_id": activity_id,
                                            "title_activity":title_activity,
                                            "description_activity": description_activity,
                                            "status_activity": status_activity,
                                            "importance_activity": importance_activity
                                            })


                                                                    #acima com os dados na variavel data_for_map, o algoritmo percorre toda a variavel, e insere os dados que foram resgatados da base de dados e insere em variaveis especificas dados especificos como: id e descrição das tarefas, nome e id dos operadores, além do proprio status da atividade. E com isso ele cria um JSON para enviar para o front-end.

        return jsonify(data_activity_status_op) 



#====================================================================================================================================

@app.route("/turn_menu", methods = ["POST"])

def turn_menu():

    if request.method == "POST":

        confirm_demand = request.json.get("confirm_demand",False)
        conn = get_db_connection()
        cursor = conn.cursor()

        data_turn_report = []

        cursor.execute('''SELECT * FROM turn''')
        data_turn_db = cursor.fetchall()

        for line in data_turn_db:
            activity_id = line[0]
            title = line[1]
            description= line[2]
            importance = line[3]
            status = line[4]

            data_turn_report.append({"activity_id": activity_id,
                                     "title": title,
                                     "description": description,
                                     "importance": importance,
                                     "status": status
                                    })
        


            if confirm_demand == True:
            
                cursor.execute('''DELETE FROM turn WHERE status = 'Concluida' ''')
                conn.commit() 
                cursor.execute('''SELECT * FROM turn''')
                result_demand = cursor.fetchall()

                return jsonify(result_demand)
        
        return jsonify(data_turn_report)
    
                                                                    #acima o algoritmo faz a filtragem para o turno seguinte, ou seja, ele limpa as tarefas concluidas e deixa somente as pendentes para o próximo turno, isso garante a continuidade das tarefas, atráves da variavel confirm_demand, se for False deverá somente exibir todas concluidas e pendentes, se for True deverá limpar as concluidas e deixar somente as pendentes.

if __name__ == '__main__':
    app.run(debug=True,use_reloader=False)