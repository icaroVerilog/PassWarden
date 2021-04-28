import React from "react"
import {  Link  } from "react-router-dom"
import { ArrowForwardIos } from '@material-ui/icons';
import Logo from "../../../assets/logo.png"
import "./loginHeader.css"

export default function LoginHeader(props){
    return (
        
        <div id="login-header">
            <img src={Logo} id="login-header-img"></img>
            <Link to="/" id="login-header-text">BIT<span id="a">WARDEN</span></Link>
            <Link to="/sobre" id="about" className="header-links">S<span id="a">OBRE</span></Link>
        </div>

    )
}