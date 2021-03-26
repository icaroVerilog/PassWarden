import React, { useState } from "react";
import API from "../../services/API"
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import Hacker from "../../assets/hacker.jpg"
import "./Styles.css";


import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import InsertDriveFileOutlined from '@material-ui/icons/InsertDriveFileOutlined';
import RefreshIcon from '@material-ui/icons/Refresh';


const CustomSlider = withStyles({

    root: {
        color: "#111927",

        position: "relative",
        top: "50%",
        left: "50%",

        width: "20%",
        height: "10px",
    },
    track: {
        height: 4,
        borderRadius: 2,
        color: "#111927",

        width: "20%",
        height: "5px",
    },

    valueLabel: {
        left: 'calc(-50% + 1px)',
        top: -22,
        '& *': {
            background: 'transparent',
            color: '#000',
        },
    },
    
    rail: {

        height: "5px",
        color: "#111927",
        width: "100%",

    },

    thumb: {
        height: 20,
        width: 20,
        backgroundColor: "#fff",
        border: "1px solid currentColor",
        marginTop: -8,
        marginLeft: -11,
        boxShadow: "#ebebeb 0 2px 2px",
        "&:focus, &:hover, &$active": {
            boxShadow: "#ccc 0 2px 3px 1px",
        },
        color: "#111927",
    },

})(Slider);


function handleSliderValue(value){
    console.log(value);
}


export default function Home(props){

    const [password, setPassword] = useState("")

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

    return (
        <div>
            <Header></Header>
            <div id="main">
                <div id="introduce-text-div">
                    <p id="introduce-text"> 
                        Gere senhas confiáveis de maneira rápida
                    </p>                                                
                </div>
                <div id="password-generator">
                    <div id="output-box-div">
                        <input id="output-box" type="text" readOnly={true} value={password}/>
                        <InsertDriveFileOutlined id="output-box-icon" style={{ fontSize: 50 }} onClick={() => {copyToClipboard()}}/>
                        <RefreshIcon id="output-box-icon2" style={{ fontSize:57 }} onClick={() => {getPassword()}}/>
                    </div>
                    <CustomSlider 
                        valueLabelDisplay="auto"
                        defaultValue={4}
                        aria-labelledby="discrete-slider"
                        getAriaValueText={handleSliderValue}
                        step={1}
                        marks
                        min={4}
                        max={15}     
                    />
                </div>
            </div>
            <div id="informations">
                <img id="hacker-img" src={Hacker}></img>
            </div>
            <Footer></Footer>
        </div>      
    )
}
