import React from 'react';
import classes from './Text.module.css';
import {useNavigate} from "react-router-dom";

const Text = ({children, to, ...props}) => {

    const navigate = useNavigate()

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

    return (
        <p style={props.style} className={classes.text}>{children}</p>
    );
};

export default Text;