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
        height: 5,
        padding: "300px 0",
        left: "350px",
        width: `${sliderWidth}px`,
    },
    track: {
        height: 4,
        borderRadius: 2,
        color: "#111927",

        width: `${sliderWidth}px`,
    },

    valueLabel: {
        left: 'calc(-50% + 4px)',
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
