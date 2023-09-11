import React from 'react';
import classes from './Text.module.css';
import {useNavigate} from "react-router-dom";
import {clrs} from "../../../constants/colors";

const Text = ({children, to, type, ...props}) => {

    const navigate = useNavigate();

    const propsToAdd = {}
    if (props.default) {
        propsToAdd.fontSize = "1rem";
    }
    if (props.normalWeight) {
        propsToAdd.fontWeight = "500";
    }

    function handleOnClick() {
        if (to.startsWith('/#')) {
            window.location.assign(to);
        } else {
            navigate(to);
        }

    }

    if (to != null) {
        return (
            <p style={{cursor:"pointer", ...props.style}} onClick={handleOnClick} className={classes.text}>{children}</p>
        );
    }

    if (type === 'button') {
        return (
            <p onClick={props.onClick} style={{backgroundColor: clrs.blackBlue, color: clrs.white}} className={classes.button}>{children}</p>
        );
    }

    if (type === 'button-red') {
        return (
            <p onClick={props.onClick} style={{backgroundColor: clrs.red, color: clrs.white}} className={classes.button}>{children}</p>
        );
    }

    if (type === 'button-black') {
        return (
            <p onClick={props.onClick} style={{backgroundColor: clrs.blacker, color: clrs.white}} className={classes.button}>{children}</p>
        );
    }

    if (type === 'button-green') {
        return (
            <p onClick={props.onClick} style={{backgroundColor: clrs.green, color: clrs.white}} className={classes.button}>{children}</p>
        );
    }

    if (type === 'button-grey') {
        return (
            <p onClick={props.onClick} style={{backgroundColor: clrs.silver, color: clrs.white}} className={classes.button}>{children}</p>
        );
    }

    if (props.default || props.normalWeight) {
        return (
            <p style={{...propsToAdd, ...props.style}} onClick={props.onClick} className={classes.text}>{children}</p>
        );
    }


    return (
        <p style={props.style} onClick={props.onClick} className={classes.text}>{children}</p>
    );
};

export default Text;