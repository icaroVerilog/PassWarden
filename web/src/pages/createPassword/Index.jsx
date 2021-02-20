import React, { useState } from "react"
import {  Link  } from "react-router-dom"
import "./Styles.css"
import API from "../../services/API"

export default function CreatePassword(props) {

    const [password, setPassword] = useState("")

    function getPassword() {
        API.get("gerar-senha").then(response => {
            
            setPassword(response.data.password)

        })
    }

    // Copia a senha para a área de transferencia
    function copyToClipboard() {

        console.log(password)
        navigator.clipboard.writeText(password)

    }
    
    return (
        <div id="page-home">
            <header className="Header d-none d-sm-flex flex-column">
                <h1 id="main-text">W4rd3n</h1>
                <h2 id="slogan-text">organizador e gerador de senhas</h2>
                <Link to="/senhas" id="passwords-link">
                    Senhas
                </Link>
                <Link to="/sobre" id="about-link">
                    Sobre
                </Link>
            </header>
            <main>
                <div id="password-div">
                    <input type="text" name="" id="password-output" value={password}  readOnly={true}/>
                    <button id="password-button1" onClick={() => {getPassword()}}>Gerar senha</button>
                    <button id="password-button2" onClick={() => {copyToClipboard()}}>Copiar senha</button>
                </div>
            </main>
        </div>
    )
}