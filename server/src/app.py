from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import bcrypt
import random
import string
import json

APP = Flask(__name__)

CORS(APP)
cors = CORS(APP, resources = {
    r"/*": {
        "origins": "*"
    }
})


@APP.route("/", methods = ["GET", "POST"])
def home():
    if (request.method == "POST"):
        requestParsed = request.get_json()
        return jsonify({"situation": "OK"}, requestParsed)

    elif (request.method == "GET"):
        return jsonify({"message": "main page"})

@APP.route("/senhas", methods = ["GET", "POST"])
def password():
    if (request.method == "POST"):
        requestParsed = request.get_json()

        #CONVERTENDO A VARIAVEL REQUESTPARSED PARA STRING, PORQUE INT NÃO É ITERAVEL
        password = str(requestParsed["password"])

        #hashedPassword = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        connection = sqlite3.connect("../database/passwordsDatabase.sqlite")
        CUR = connection.cursor()

        CUR.execute(""" 
                CREATE TABLE IF NOT EXISTS "passwords" (
                    "password_ID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
                    "password"	TEXT NOT NULL
                );
        """)

        CUR.execute("INSERT INTO passwords (password) VALUES (?)", [password])
        connection.commit()
        connection.close()

        
        return json.dumps({"message": "senha cadastrada com sucesso", "password": password})


    elif (request.method == "GET"):

        connection = sqlite3.connect("../database/passwordsDatabase.sqlite")
        CUR = connection.cursor()

        CUR.execute("SELECT * FROM passwords")
        DATA = CUR.fetchall()


        return json.dumps({"message": "success", "data": DATA})

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
