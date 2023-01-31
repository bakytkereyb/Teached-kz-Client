import React from 'react';
import cl from './Button.module.css'
const Button = ({children, colorBack, colorText}) => {
    return (
        <button className={cl.button} style={{backgroundColor: colorBack, color: colorText}}>
            {children}
        </button>
    );
};

export default Button;