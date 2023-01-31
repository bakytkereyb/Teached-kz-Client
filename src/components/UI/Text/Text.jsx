import React from 'react';
import classes from './Text.module.css';

const Text = ({children, colorText}) => {
    return (
        <p style={{color: colorText}} className={classes.text}>{children}</p>
    );
};

export default Text;