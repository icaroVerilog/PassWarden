from flask import Flask, jsonify, request
from flask_cors import CORS
from passlib.hash import sha256_crypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_access_token
from flask_jwt_extended import verify_jwt_in_request
import sqlite3
import random
import string
import json



APP = Flask(__name__)

APP.config["JWT_SECRET_KEY"] = "qualquer coisa"

CORS(APP)
    
cors = CORS(APP, resources = {
    r"/*": {
        "origins": "*"
    }
})

JWTManager(APP)

@APP.route("/", methods = ["GET", "POST"])
def home():

    if (request.method == "POST"):
        requestParsed = request.get_json()
        return jsonify({"situation": "OK"}, requestParsed)

    elif (request.method == "GET"):
        return jsonify({"message": "main page"})


@APP.route("/cadastro", methods = ["POST"])
def usuario():

    requestParsed = request.get_json()

    password = str(requestParsed["user_password"])
    username = str(requestParsed["username"])
    email = str(requestParsed["email"])

    hashed_password = sha256_crypt.hash(password)



    connection = sqlite3.connect("../database/DB-PasswordGenerator.sqlite")
    CUR = connection.cursor()

    # CUR.execute(""" 
    #         CREATE TABLE IF NOT EXISTS "users" (
    #             "user_ID"	    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    #             "username"      TEXT NOT NULL UNIQUE,
    #             "email"         TEXT NOT NULL UNIQUE,
    #             "password"	    TEXT NOT NULL
    #         );
    # """)

    try:
        CUR.execute("INSERT INTO users (username, email, user_password) VALUES (?,?,?)",
                    [username, email, hashed_password])

        connection.commit()
        connection.close()

        return json.dumps({"message": "sucesso", "conteudo": {"username": username, "email": email, "password": hashed_password}})

    except sqlite3.IntegrityError:

        return jsonify({"message": "erro, usuário já cadastrado"}), 400

@APP.route("/login", methods = ["POST"])
def login():
    
    requestParsed = request.get_json()
    request_username = str(requestParsed["username"])
    request_password = str(requestParsed["password"])

    connection = sqlite3.connect("../database/DB-PasswordGenerator.sqlite")
    CUR = connection.cursor()

    try:

        CUR.execute("SELECT * FROM users WHERE username = ?", [request_username])
        data = CUR.fetchone()
        connection.commit()
        connection.close()

        id = data[0]
        username = data[1]
        email = data[2]
        password = data[3]


        if (sha256_crypt.verify(request_password, password)):

            access_token = create_access_token(identity = id)

            return jsonify({
                "access_token": access_token,
                "message": "correct password",
            }), 200

        else:
            return jsonify({
                "message": "wrong password or username"
            }), 401
    
    except TypeError:
        return jsonify({
                "message": "wrong password or username"
            }), 401




@APP.route("/senhas", methods = ["GET", "POST", "DELETE"])
@jwt_required()

def password():
    if (request.method == "POST"):
        requestParsed = request.get_json()

        #CONVERTENDO A VARIAVEL REQUESTPARSED PARA STRING, PORQUE INT NÃO É ITERAVEL
        password = str(requestParsed["password"])
        description = str(requestParsed["description"])

        #hashedPassword = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        connection = sqlite3.connect("../database/DB-PasswordGenerator.sqlite")
        CUR = connection.cursor()

        # CUR.execute(""" 
        #         CREATE TABLE IF NOT EXISTS "passwords" (
        #             "password_ID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
        #             "user_ID"	    INTEGER NOT NULL,
        #             "password"	    TEXT NOT NULL
        #         );
        # """)

        CUR.execute("INSERT INTO passwords (user_ID ,password, description) VALUES (?,?,?)", [1, password, description])
        connection.commit()
        connection.close()

        
        return json.dumps({"message": "senha cadastrada com sucesso", "password": password})


    elif (request.method == "GET"):

        connection = sqlite3.connect("../database/DB-PasswordGenerator.sqlite")
        CUR = connection.cursor()

        CUR.execute("SELECT * FROM passwords INNER JOIN users ON  passwords.user_ID = users.user_ID")
        DATA = CUR.fetchall()

        TESTE = DATA[0]



        return json.dumps({"message": "success", "data": TESTE})

@APP.route("/gerar-senha", methods = ["GET"])
def generatePassword():
    
    def getRandomPassword(length):
        letters = string.ascii_letters
        result_str = ''.join(random.choice(letters) for i in range(length))

        return json.dumps({"password": result_str})   

    requestParced = request.get_json()

    print(request.data)
    print(requestParced)
    #length = int(requestParced["length"])
    #passwordGenerated = getRandomPassword(requestParced["length"])
    passwordGenerated = getRandomPassword(15)
    return passwordGenerated


@APP.route("/sobre", methods = ["GET"])
def about():
    return jsonify({"message": "Feito por Ícaro Moreira"})


if (__name__ == "__main__"):
    APP.run(debug=True, port=5005)
