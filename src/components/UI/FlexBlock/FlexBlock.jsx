import React from 'react';
import classes from './FlexBlock.module.css';

const FlexBlock = ({children, style}) => {
    return (
        <div className={classes.flexBlock} style={style}>
            {children}
        </div>
    );
};

export default FlexBlock;