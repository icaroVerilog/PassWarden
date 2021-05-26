import React, { useState, useEffect} from "react"
import Axios from "axios"
import LoginHeader from "../../components/loginHeader/loginHeader"
import Footer from "../../components/footer/Footer"


import "./Styles.css"



export default function Passwords(props) {

    const token = localStorage.getItem("auth-token-access");    // Recupera o token de autenticação do armazenamento local
    const username = localStorage.getItem("username")           // Recupera o nome do usuário que queremos as senhas do armazenamento local
    
    const [passwords, setPasswords] = useState([])

    useEffect(() => {

        Axios({
            method: "GET",
            url: "http://localhost:5005/senhas",
            headers: {
                username: username,
                authorization: `Bearer ${token}`    // Token de autenticação
            }
        }).then(response => {
    
            console.log(response.data.data)
            setPasswords(response.data.data)
    
        })

    },[])


    return (

        <>
            <LoginHeader/>
            <div id="passwords-main-div">
                <div id="passwords-content-div">
                    
                    <ul id="password-ul">
                        {passwords.map(password => {
                            return (
                                <li key={password[0]} className="password-li">
                                    <span>senha: {password[1]}</span>
                                    <span>descrição: {password[2]}</span>  
                                </li>   
                            )
                        })}
                    </ul>
                </div>
            </div>
            <Footer/>
        </>
    
    )
}