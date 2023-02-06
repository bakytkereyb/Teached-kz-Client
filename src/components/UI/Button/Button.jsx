import React from 'react';
import cl from './Button.module.css'
import {clrs} from "../../../constants/colors";
const Button = ({children, type, ...props}) => {

    if (type === 2) {
        return (
            <button onClick={props.onClick} className={cl.button} style={{backgroundColor: clrs.blackBlue, color: clrs.white}}>
                {children}
            </button>
        );
    }

    return (
        <button onClick={props.onClick} className={cl.button} style={{backgroundColor: clrs.red, color: clrs.white}}>
            {children}
        </button>
    );
};

export default Button;