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

#TODO REVISAR NOMES DE VARIÁVEIS
#TODO refletir sobre usar um ORM no caso o sqlalchemy

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

    username = str(requestParsed["username"])
    password = str(requestParsed["user_password"])
    email = str(requestParsed["email"])

    hashed_password = sha256_crypt.hash(password)

    connection = sqlite3.connect("../database/DB-PasswordGenerator.sqlite")
    CUR = connection.cursor()

    try:
        CUR.execute("INSERT INTO users (username, email, user_password) VALUES (?,?,?)",
                    [username, email, hashed_password])

        connection.commit()
        connection.close()

        return json.dumps({"message": "sucesso", "conteudo": {"username": username, "email": email, "password": hashed_password}})

    except sqlite3.IntegrityError:

        return jsonify({"message": "erro, usuário já cadastrado"}), 401

@APP.route("/login", methods = ["POST"])
def login():
    
    requestParsed = request.get_json()
    print (requestParsed)
    request_username = str(requestParsed["username"])
    request_password = str(requestParsed["user_password"])

    connection = sqlite3.connect("../database/DB-PasswordGenerator.sqlite")
    CUR = connection.cursor()

    print("############# passou ###############")

    try:

        CUR.execute("SELECT * FROM users WHERE username = ?", [request_username])
        data = CUR.fetchone()
        connection.commit()
        connection.close()

        print(data)

        id = data[0]
        username = data[1]
        email = data[2]
        password = data[3]

        if (sha256_crypt.verify(request_password, password)):
            access_token = create_access_token(identity = username)

            return jsonify({
                "ID": id,
                "access_token": access_token,
                "message": "correct password",
            }), 200

        else:
            return jsonify({
                "message": "wrong password or username"
            }), 200
    
    except TypeError:
        return jsonify({
                "message": "wrong password or username"
        }), 200

@APP.route("/senhas", methods = ["GET", "POST", "DELETE"])
@jwt_required()
def password():
    
    if (request.method == "POST"):
        requestParsed = request.get_json()

        #CONVERTENDO A VARIAVEL REQUESTPARSED PARA STRING, PORQUE INT NÃO É ITERAVEL 
        user_id = str(requestParsed["user_id"])
        password = str(requestParsed["password"])
        description = str(requestParsed["description"])


        connection = sqlite3.connect("../database/DB-PasswordGenerator.sqlite")
        CUR = connection.cursor()

        CUR.execute("INSERT INTO passwords (user_ID ,password, description) VALUES (?,?,?)", [user_id, password, description])
        connection.commit()
        connection.close()

        
        return jsonify({"message": "senha cadastrada com sucesso", "password": password})


    elif (request.method == "GET"):

        print(request.headers)

        username = request.headers.get("username")
        connection = sqlite3.connect("../database/DB-PasswordGenerator.sqlite")
        CUR = connection.cursor()

        CUR.execute("""
                    SELECT password_id, password, description FROM passwords
                    LEFT JOIN users ON passwords.user_ID = users.user_ID
                    WHERE username = (?)
                    """, [username]
                    )

        DATA = CUR.fetchall()
        connection.commit()
        connection.close()
        
        return jsonify({"message": "success", "data": DATA})

    #TODO Criar a função de deletar senha

    elif (request.method == "DELETE"):
        pass
        
@APP.route("/gerar-senha", methods = ["POST"])
def generatePassword():

    def random_password(length, type = "all"):

        lowercase = "abcdefghijklmnopqrstuvwxyz"
        uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        numbers = "0123456789"
        symbols = "[]{}()+-!@#$%&*\/_<>;:|="
        
        if (type == "all"):
            characters = lowercase + uppercase + numbers + symbols
            password = "".join(random.sample(characters, length))

            return password

        elif (type == "only_letters"):
            characters = lowercase + uppercase
            password = "".join(random.sample(characters, length))

            return password

        elif (type == "only_numbers"):
            characters = numbers
            password = "".join(random.sample(characters, length))

            return password

    length = request.json["length"]
    type = request.json["type"]

    password = random_password(length, type)
    print(password)

    return jsonify({"message": "success", "password": password})
    


@APP.route("/sobre", methods = ["GET"])
def about():
    return jsonify({"message": "Feito por Ícaro Moreira"})


if (__name__ == "__main__"):
    APP.run(debug=True, port=5005)
