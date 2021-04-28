import React from "react"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"

import "./Styles.css"

export default function About(props) {
    return (
        <div>
            <Header></Header>
            <div id="main">
                <div id="about-site">
                    <p id="firstP">
                        O <span id="a">BIT</span>WARDEN "Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                </div>
                <div id="about-me"></div>
            </div>
            <Footer></Footer>
        </div>
    )
}