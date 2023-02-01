import React from 'react';
import classes from './Form.module.css';

const FormBlock = ({children, ...props}) => {
    return (
        <form {...props} className={classes.formBlock}>
            {children}
        </form>
    );
};

export default FormBlock;