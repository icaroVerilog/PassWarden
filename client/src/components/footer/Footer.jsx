import React from "react"
import {  Link  } from "react-router-dom"

import "./Footer.css"

import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';


export default function Footer(props){
    return (
        
        <div id="footer">
            <p id="footer-text">Feito com <span>amor</span> por <span>I</span>caro<span>M</span>oreira</p>
            
            <div id="links">
                <a className="social-links" href="https://github.com/IcaroM-CdC"><GitHubIcon id="github"></GitHubIcon></a>
                <a className="social-links" href="https://www.linkedin.com/in/%C3%ADcaro-moreira/"><LinkedInIcon id="linked-in"></LinkedInIcon></a>
            </div>
        </div>

    )
}