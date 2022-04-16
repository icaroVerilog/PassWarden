import React from "react"
import {  Link  } from "react-router-dom"

import "./Footer.css"

export default function Footer(props){
    return (
        <div id="footer">
            <div id="links">
                <div id="github-icon-wrapper">
                    <a id="github-icon" href="https://github.com/IcaroM-CdC" target="_blank"></a>
                </div>
                <div id="linkedin-icon-wrapper">
                    <a id="linkedin-icon" href="https://www.linkedin.com/in/%C3%ADcaro-moreira/" target="_blank"></a>
                </div>
            </div>
            <p id="footer-text">icaro.moreira@protonmail.com</p>
        </div>
    )
}