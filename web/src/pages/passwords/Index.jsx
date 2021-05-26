import React, { useState } from "react"
import Axios from "axios"
import API from "../../services/API"
import LoginHeader from "../../components/loginHeader/loginHeader"
import Footer from "../../components/footer/Footer"


import "./Styles.css"



export default function Passwords(props) {

    const token = localStorage.getItem("auth-token-access");    // Recupera o token de autenticação do armazenamento local
    const username = localStorage.getItem("username")           // Recupera o nome do usuário que queremos as senhas do armazenamento local
    
    Axios({
        method: "GET",
        url: "http://localhost:5005/senhas",
        headers: {
            username: username,
            authorization: `Bearer ${token}`    // Token de autenticação
        }
    }).then(response => {

        console.log(response.data)

    })

    return (

        <>
            <LoginHeader/>
            <div id="passwords-main-div">
                <div id="passwords-content-div">

                </div>
            </div>
            <Footer/>
        </>
    
    )
}