import React, { useState } from "react"
import {  Link  } from "react-router-dom"
import API from "../../services/API"
import Axios from "axios"

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
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

    })
    
    function handleChange(event){

        const { name, value } = event.target; //Pegando o valor e o nome do input que chamar a função

        setData({ ...data, [name]: value})

    }


    function handleSubmit(event){

        event.preventDefault();
        
        Axios({
            method: "POST",
            url: "http://localhost:5005/login",
            data: data,
        }).then(response => {

            localStorage.setItem("auth-token-access", response.data.access_token)
            localStorage.setItem("username", data.username)
            console.log(response.status)
            console.log(response.data.message)

        })
        
    }

    //console.log(data)

    return (
        <div id="login-main" >
            <AnimatedBackground/>
            <Link to="/">
                <img src={Bitwarden} id="main-link"/>
            </Link>
            <form id="login-div" onSubmit={handleSubmit}>
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

                <SubmitButton type="submit" id="submit-button">Login</SubmitButton>
                
            </form>
        </div>

    )

}