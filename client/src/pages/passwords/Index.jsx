import React, { useState, useEffect} from "react"
import Axios from "axios"
import LoginHeader from "../../components/loginHeader/loginHeader"
import Footer from "../../components/footer/Footer"


import "./Styles.css"
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

const OutputTextField = withStyles({
    root: {
        '& .MuiInputBase-root': {
            color: 'white', // Cor do texto do input
        },
        '& label.Mui-focused': {
            color: '#9FEF00', // Cor da tarja quando focada
            fontFamily: [ "Orbitron"  ],
            fontSize: "20px",
        },
        '& label': {
            color: '#9FEF00', // Cor da tarja
            fontFamily: [ "Orbitron"  ],
            fontSize: "20px",
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
        
        fontFamily: [ "Orbitron"  ],
        height: "100%",
        fontSize: "20px"
        },
        
        height: "75px",
        marginTop: "25px",
        marginBottom: "25px",
        fontFamily: [ "Orbitron"  ],

    },
})(TextField);

export default function Passwords(props) {

    const token = localStorage.getItem("auth-token-access");    // Recupera o token de autenticação do armazenamento local
    const username = localStorage.getItem("username")           // Recupera o nome do usuário que queremos as senhas do armazenamento local
    
    const [passwords, setPasswords] = useState([])

    useEffect(() => {

        Axios({
            method: "GET",
            url: "http://localhost:5005/senhas",
            headers: {
                username: username,
                authorization: `Bearer ${token}`    // Token de autenticação
            }
        }).then(response => {
    
            console.log(response.data.data)
            setPasswords(response.data.data)
    
        })

    },[])


    return (

        <>
            <LoginHeader/>
            <div id="passwords-main-div">
                <div id="new-password-div">
                    <div id="input-div">
                        <input className="password-input" type="text" placeholder="senha"/>
                        <input className="password-input" type="text" placeholder="descrição"/>
                    </div>
                    <button id="new-password-button"><AddCircleOutlineIcon></AddCircleOutlineIcon></button>
                </div>
                <ul id="password-ul">
                    {passwords.map(password => {
                        return (
                            <li key={password[0]} className="password-li">
                                <div id="password-content">
                                    <OutputTextField value={password[1]} inputProps={{readOnly: true}} variant="outlined" label={"senha"}/>
                                    <OutputTextField value={password[2]} inputProps={{readOnly: true}} variant="outlined" label={"descrição"}/>
                                </div>
                                {/* <div id="password-buttons">
                                    <button className="action-button" id="delete-btn"><DeleteIcon></DeleteIcon></button>
                                    <button className="action-button"><CreateIcon></CreateIcon></button>
                                </div> */}
                            </li>   
                        )
                    })}
                </ul>
            </div>
            <Footer/>
        </>
    
    )
}