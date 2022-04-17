import React from "react"
import {  Link  } from "react-router-dom"
import { ArrowForwardIos } from '@material-ui/icons';
import passwardenLogo from "../../assets/passwardenLogo3.png"
import "./Header.css"

export default function Header(props){
    return (
        <div id="header">

            <Link to="/" id="header-logo-wrapper">
                <img id="header-logo" src={passwardenLogo} alt="" />
            </Link>
        </div>
    )
}