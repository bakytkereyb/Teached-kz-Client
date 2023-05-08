import React from 'react';
import classes from './Form.module.css';

const FormInput = ({labelText, value, onChange, id, type, required, maxWidth, min, max, multiple, className, withoutLabel}) => {

    function onChangeInput(e) {
        if (e.target.getAttribute('type') != "file") {
            onChange(e.target.value);
        } else {
            if (!multiple) {
                onChange(e.target.files[0]);
            } else {
                onChange(e.target.files);
            }

        }
    }

    return (
        <div style={{maxWidth:maxWidth}} className={[classes.formField, className].join(' ')}>
            {!withoutLabel &&
                <label htmlFor={id}>{labelText} {required ? <span className={classes.required}>*</span> : ""}</label>
            }
            <input value={value} onChange={onChangeInput} multiple={multiple} min={min} max={max} id={id} type={type} required={required}/>
        </div>
    );
};

export default FormInput;