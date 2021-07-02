import React, { useState, useEffect } from "react";
import Axios from "axios"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"

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

    useEffect(() => {
        
        getPassword()

    },[passwordLenght])
    
    
    function handleSliderValue(value){

        setPasswordLenght(value)
        
    }
    
    function getPassword() {

        Axios({
            method: "POST",
            url: "http://localhost:5005/gerar-senha",
            data: {
                length: passwordLenght
            },
        }).then(response => {

            // console.log(response.status)
            // console.log(response.data)
            setPassword(response.data.password)

        })
    }

    // Copia a senha para a área de transferencia
    function copyToClipboard() {

        console.log(password)
        navigator.clipboard.writeText(password)

    }

    return (
        <>
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
            <div id="about-div">
                <h1 className="questions-text"> Porque utilizar um gerador de senhas?</h1>
                <h2 className="answer-text">
                    As pessoas não são boas para gerar senhas aleatórias. Elas usam palavras ou números que significam alguma coisa para elas: 
                    um nome de animal de estimação, letras de música, etc. O resultado é senhas fáceis de adivinhar, o que é um problema.
                </h2>
                <h1 className="questions-text"> O que torna uma senha forte?</h1>
                <h2 className="answer-text">
                    Senhas boas são longas, realmente longas (pense acima de 16 caracteres) e aleatórias. 
                </h2>
                <h1 className="questions-text"> Eu preciso de uma senha exclusiva para cada conta?</h1>
                <h2 className="answer-text" id="last-answer">
                    Sim! Utilizar a mesma senha em várias contas é algo que não deve ser feito. 
                    Se cibercriminosos obtiverem a senha de uma das suas contas, eles também terão a senha de todas as outras contas. 
                    Portanto, nunca recicle senhas. Use senhas diferentes e exclusivas para cada conta.
                </h2>
                {/* <h1 className="questions-text"> Quais são as piores senhas?</h1>
                <h2 className="answer-text">
                    
                </h2> */}
            </div>
            <Footer></Footer>
        </>      
    )
}
