import React from 'react';
import classes from './Text.module.css';

const Text = ({children, ...props}) => {
    return (
        <p style={props.style} className={classes.text}>{children}</p>
    );
};

export default Text;