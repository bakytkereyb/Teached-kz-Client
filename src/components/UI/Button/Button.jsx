import React from 'react';
import cl from './Button.module.css'
import {clrs} from "../../../constants/colors";
const Button = ({children, type}) => {

    if (type === 2) {
        return (
            <button className={cl.button} style={{backgroundColor: clrs.blackBlue, color: clrs.white}}>
                {children}
            </button>
        );
    }

    return (
        <button className={cl.button} style={{backgroundColor: clrs.red, color: clrs.white}}>
            {children}
        </button>
    );
};

export default Button;