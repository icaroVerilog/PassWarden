import React from "react"
import {  Link  } from "react-router-dom"
import Logo from "../../../assets/logo.png"
import "./Header.css"

export default function Header(props){
    return (
        
        <div id="header">
            <img src={Logo} id="header-img"></img>
            <Link to="/" id="header-text">BIT<span id="a">WARDEN</span></Link>
            <Link to="/sobre" id="about" >S<span id="a">OBRE</span></Link>
        </div>

    )
}