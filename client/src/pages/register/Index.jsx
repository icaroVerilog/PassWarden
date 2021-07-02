import React, { useState } from "react"
import {  Link  } from "react-router-dom"
import API from "../../services/API"

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import Bitwarden from "../../assets/Bitwarden.png"

import AnimatedBackground from "../../components/backgroundAnimation/Animation"

import "./Styles.css"


const SubmitButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        backgroundColor: '#141D2B',
        width: '75%',
        height: '75px',
        fontFamily: [
            'Orbitron'
        ].join(','),
        '&:hover': {
            backgroundColor: '#9FEF00',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#9FEF00',
        },
    },
  })(Button);

const CssTextField = withStyles({
    root: {
        '& .MuiInputBase-root': {
            color: 'white', // Cor do texto do input
        },
        '& label.Mui-focused': {
            color: '#9FEF00', // Cor da tarja quando focada
            fontSize: "13px",
        },
        '& label': {
            color: '#9FEF00', // Cor da tarja
            fontFamily: [ "Orbitron"  ],
            fontSize: "13px",
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#141D2B',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: "#9FEF00", // Cor da borda padrão
            },
            '&:hover fieldset': {
                borderColor: "#9FEF00",
            },
            '&.Mui-focused fieldset': {
                borderColor: '#9FEF00',
            },

        backgroundColor: "#141D2B", // Cor de fundo
        
        
        },
      
        padding: '0 0 25px',
        fontFamily: [ "Orbitron"  ],

    },
})(TextField);



export default function Register(props) {


    const [data, setData] = useState({

        username: "",
        user_password: "",
        email: ""

    });

    
    function handleChange(event){

        const { name, value } = event.target; //Pegando o valor e o nome do input que chamar a função

        setData({ ...data, [name]: value})

    }


    function handleSubmit(event){

        event.preventDefault();

        API.post("cadastro", data).then(response => {

            console.log(response.data)

        })
    }

    //console.log(data)

    return (
        <div id="register-main" >
            <AnimatedBackground/>
            <Link to="/">
                <img src={Bitwarden} id="main-link"/>
            </Link>
            <form id="register-div" onSubmit={handleSubmit}>
                <Link></Link>
                <CssTextField
                    label="USERNAME"
                    variant="outlined"
                    id="custom-css-outlined-input"
                    className="inputs"
                    name="username"
                    onChange={event => handleChange(event)}
                />

                <CssTextField
                    label="PASSWORD"
                    variant="outlined"
                    id="custom-css-outlined-input"
                    className="inputs"
                    name="user_password"
                    onChange={event => handleChange(event)}
                />

                <CssTextField
                    label="EMAIL"
                    variant="outlined"
                    id="custom-css-outlined-input"
                    className="inputs"
                    onChange={event => handleChange(event)}
                    name="email"
                />

                <SubmitButton type="submit" id="submit-button">Register</SubmitButton>
                
            </form>
        </div>

    )

}