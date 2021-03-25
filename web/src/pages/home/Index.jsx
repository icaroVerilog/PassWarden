import React from "react";

import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import "./Styles.css";


const sliderWidth = 700;

const CustomSlider = withStyles({

    root: {
        color: "#111927",

        position: "relative",
        top: "75%",

        left: "25%",
        width: `${sliderWidth}px`,
        height: "10px",
    },
    track: {
        height: 4,
        borderRadius: 2,
        color: "#111927",

        width: `${sliderWidth}px`,
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

        height: 5,
        color: "#111927",
        width: `${sliderWidth}px`,

    },

    thumb: {
        height: 20,
        width: 20,
        backgroundColor: "#fff",
        border: "1px solid currentColor",
        marginTop: -9,
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
    return (
        <div>
            <Header></Header>
            <div id="main">
                <div id="password-generator">
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
            <Footer></Footer>
        </div>      
    )
}
