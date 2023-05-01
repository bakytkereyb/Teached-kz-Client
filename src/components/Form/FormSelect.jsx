import React from 'react';
import classes from "./Form.module.css";

const FormSelect = ({labelText, values, onChange, id, required, maxWidth, padding, selectedValue, withoutLabel}) => {

    function handleOnChange(e) {
        onChange(values.find(item => item.value === e.target.value))
    }

    return (
        <div style={{maxWidth:maxWidth, padding: padding}} className={classes.formField}>
            {withoutLabel === true ?
                ''
                :
                <label htmlFor={id}>{labelText} {required ? <span className={classes.required}>*</span> : ""}</label>
            }

            <select onChange={handleOnChange} id={id} required={required}>
                <option disabled selected={selectedValue?.value === null || selectedValue?.value === ''} value=""></option>
                {values.map((value) => {
                    if (selectedValue?.value != null && selectedValue?.value !== '') {
                        if (value.value.includes(selectedValue.value)) {
                            return <option label={value.label} selected={true} key={labelText + new Date() + value.value} value={value.value}>{value.label}</option>
                        }
                    }
                    return <option label={value.label} key={labelText + new Date() + value.value} value={value.value}>{value.label}</option>
                })}
            </select>
        </div>
    );
};

export default FormSelect;