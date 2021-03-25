import React, { useState } from "react"
import {  Link  } from "react-router-dom"
import "./Styles.css"
import API from "../../services/API"

export default function CreatePassword(props) {

    const [password, setPassword] = useState("")
    const [sliderValue,  setSliderValue] = useState("")

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

    function handleSliderValue() {
        
    }
    
    return (
        <div></div>
    )
}