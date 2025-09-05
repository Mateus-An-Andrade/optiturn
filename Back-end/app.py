import os

from flask import Flask, render_template, request, redirect, session, url_for, jsonify

import psycopg2

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






if __name__ == '__main__':
    app.run(debug=True)