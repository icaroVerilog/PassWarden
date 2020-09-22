import React from "react"
import {  Link  } from "react-router-dom"
import IMG1 from "../../assets/IMG2.png"
import IMG2 from "../../assets/IMG3.png"
import "./Styles.css"

export default function About(props) {
    return (
        <div>
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
            </header>
            <main>
                <img id="IMG1" src={IMG1} alt=""/>
                <img id="IMG2" src={IMG2} alt=""/>
                <h1 id="about1">. Projeto desenvolvido por ícaro Moreira</h1>
                <h1 id="about2">. Estudante de ciência da computação - Universidade Federal de Viçosa</h1>
                <h1 id="about4">. Github: github.com/IcaroM-CdC</h1>
                <h1 id="about3">. Desenvolvido com REACT.JS e Flask rest framework</h1>
            </main>
        </div>
        </div>
    )
}