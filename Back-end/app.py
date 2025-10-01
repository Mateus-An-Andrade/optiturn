import os

from flask import Flask, render_template, request, redirect, session, url_for, jsonify

import psycopg2

import random

from flask_cors import CORS

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, '..', 'Front-end')


app = Flask(
    __name__,
    template_folder=os.path.join(FRONTEND_DIR),          
    static_folder=os.path.join(FRONTEND_DIR)            
)


CORS (app)

def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        port=os.getenv("DB_PORT", 5432)  # padrão 5432 se não setado
    )
    return conn



                                                            # Nesta seção temos a configuração de conexão com a base de dados, ele está configurado para pegar as informações do endereço da base de dados (ou o host) assim como as informações da senha, nome de usuário, o nome do banco de dados. A chave secreta que valida as sessões foi definida também nessa seção.
#===================================================================================================================================================

#Algoritmo para página principal da página:

@app.route('/')
def index():
    return render_template("main.html")



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

        conn= get_db_connection()
        cursor = conn.cursor()

        cursor.execute('''INSERT INTO activities (title, descreption, importance)
                        values (%s,%s,%s)''',
                       (title_task,descreption_task,importance_task))
        

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
            refresh_tasks = request.json.get('refresh')
            confirmation_manager = request.json.get("confirm_production")
            data_tasks = request.json.get("data")

            if refresh_tasks == True and confirmation_manager == False:
                new_refresh = []
                for tarefa in tasks:
                    operator_sorted = random.choice(operators)

                    new_refresh.append({"id_task": tarefa['id'], "title":tarefa['titulo'], "id_operator": operator_sorted['id'],'nome_operador': operator_sorted['name'], 'importancia': importance,})
                
                return jsonify(new_refresh)
            

            elif confirmation_manager and not refresh_tasks:
                for line in data_tasks:
                    cursor.execute('''
                        INSERT INTO production (
                            operator_id,
                            activity_id,
                            status
                        ) VALUES (%s, %s, %s)
                    ''', (line['id_operator'], line['id_task'], 'iniciada'))

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
            conn.commit()
        
            return jsonify({"mensagem": "tarefa concluida"})
        
                                                            #acima temos a rota do menu MAPA, a conexão deve ser por padrão POST, se for POST o algoritmo deverá criar uma conexão com o banco de dados,verificar se o botão de pausar uma tarefa foi ou não clicado, da mesma forma um botão de concluir foi ou não clicado, se nenhum foi clicado ele deverá enviar as tarefas abaixo. Se foi clicado então ele pode altera o status para em andamento, pendente, ou concluida.
                                                            



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
            

            data_activity_status_op.append({"operator_id": operator_id, 
                                            "name_operator": name_operator, 
                                            "activity_id": activity_id,
                                            "title_activity":title_activity,
                                            "description_activity": description_activity,
                                            "status_activity": status_activity 
                                            })


                                                                    #acima com os dados na variavel data_for_map, o algoritmo percorre toda a variavel, e insere os dados que foram resgatados da base de dados e insere em variaveis especificas dados especificos como: id e descrição das tarefas, nome e id dos operadores, além do proprio status da atividade. E com isso ele cria um JSON para enviar para o front-end.

        return jsonify(data_activity_status_op) 





if __name__ == '__main__':
    app.run(debug=True)