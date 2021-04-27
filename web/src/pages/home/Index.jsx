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
        color: "#F0F8FF",

        position: "relative",
        top: "50%",
        left: "28%",
        width: "45%",
        height: "10px",
    },
    track: {
        height: 4,
        borderRadius: 2,
        color: "#F0F8FF",

        width: "20%",
        height: "5px",
    },
    mark: {
        backgroundColor: '#bfbfbf',
        height: 5,
        width: 4,
    },
    markActive: {
        opacity: 1,
        backgroundColor: "#141D2B",
        height: 5,
        width: 4,
    },
    valueLabel: {
        left: 'calc(-50% + 1px)',
        top: -50,
        fontSize: 15,
        '& *': {
            background: 'transparent',
            color: '#F0F8FF',
        },
    },    
    rail: {

        height: "5px",
        color: "#F0F8FF",
        width: "100%",

    },
    thumb: {
        height: 20,
        width: 20,
        backgroundColor: "#9FEF00",
        border: "1px solid currentColor",
        marginTop: -8,
        marginLeft: -11,
        color: "#9FEF00",
    },

})(Slider);


export default function Home(props){

    const [password, setPassword] = useState("")
    const [passwordLenght, setPasswordLenght] = useState(4)

    function handleSliderValue(value){
        
    }

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
                        <div id="output-box-icons">
                            <InsertDriveFileOutlined style={{ fontSize: 50 }} onClick={() => {copyToClipboard()}}/>
                            <RefreshIcon style={{ fontSize:57 }} onClick={() => {getPassword()}}/>
                        </div>     
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
