import React from 'react';
import classes from './Form.module.css';

const FormTextField = ({labelText, value, onChange, id, required, maxWidth, className, withoutLabel}) => {
    function onChangeInput(e) {
        onChange(e.target.value);
    }
    return (
        <div style={{maxWidth:maxWidth}} className={[classes.formField, className].join(' ')}>
            {!withoutLabel &&
                <label htmlFor={id}>{labelText} {required ? <span className={classes.required}>*</span> : ""}</label>
            }
            <textarea id={id} value={value} onChange={onChangeInput} required={required}></textarea>
        </div>
    );
};

export default FormTextField;