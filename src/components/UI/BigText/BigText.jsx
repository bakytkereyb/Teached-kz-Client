import React from 'react';
import classes from './BigText.module.css';

const BigText = ({children, ...props}) => {
    return (
        <p style={props.style} className={classes.bigText}>
            {children}
        </p>
    );
};

export default BigText;