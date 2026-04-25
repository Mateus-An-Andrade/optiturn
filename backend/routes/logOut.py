from flask import jsonify, request, Blueprint,session

logOut = Blueprint("logOut", __name__)

@logOut.route("/logout", methods = ["POST"])
def logOutSystem():
    print("sessão do sistema antes do logOut:",dict(session))

    session.clear()
    print("sessão atual do sistema: ", session)

    return ("Sessão encerrada!")