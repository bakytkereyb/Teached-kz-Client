import React from 'react';
import classes from './Text.module.css';

const Text = ({children, color}) => {
    return (
        <p className={classes.text}>{children}</p>
    );
};

export default Text;