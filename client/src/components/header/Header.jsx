import React from "react"
import {  Link  } from "react-router-dom"
import { ArrowForwardIos } from '@material-ui/icons';
import Logo from "../../assets/logo.png"
import "./Header.css"

export default function Header(props){
    return (
        
        <div id="header">
            <img src={Logo} id="header-img"></img>
            <Link to="/" id="header-text">PASS<span id="a">WARDEN</span></Link>
            <Link to="/sobre" id="about" className="header-links">S<span id="a">OBRE</span></Link>
            <Link to="/login" id="login" className="header-links">LOG<span id="a">IN</span></Link>
            <Link to="/register" id="register" className="header-links">R<span id="a">EGISTER</span></Link>
        </div>

    )
}