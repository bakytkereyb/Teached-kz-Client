import React from 'react';
import classes from './Text.module.css';

const Text = ({children, to, ...props}) => {

    function handleOnClick() {
        window.location.assign(to);
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