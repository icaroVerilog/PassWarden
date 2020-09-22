import React from "react"
import {  Link  } from "react-router-dom"
import hacker from "../../assets/IMG.png"
import "./Styles.css"


export default function Home(props){
    return (
        <div id="page-home">
            <header className="Header d-none d-sm-flex flex-column">
                <h1 id="main-text">W4rd3n</h1>
                <h2 id="slogan-text">organizador e gerador de senhas</h2>
                <Link to="/gerar-senha" id="generate-password-link">
                    Gerar senha
                </Link>
                <Link to="/senhas" id="passwords-link">
                    Senhas
                </Link>
                <Link to="/sobre" id="about-link">
                    Sobre
                </Link>
            </header>
            <main>
                <h1 id="explain-text">Uma senha forte é o segredo para manter seus dados seguros.</h1>
                <h2 id="explain-text2">Gere e armazede suas senhas de forma prática e segura</h2>
                <img src={hacker} alt="" id="backgroud-img"/>
            </main>
        </div>
    )
}