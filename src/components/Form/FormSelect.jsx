import React from 'react';
import classes from "./Form.module.css";

const FormSelect = ({labelText, values, onChange, id, required, maxWidth, padding, selectedValue, withoutLabel}) => {
    return (
        <div style={{maxWidth:maxWidth, padding: padding}} className={classes.formField}>
            {withoutLabel === true ?
                ''
                :
                <label htmlFor={id}>{labelText} {required ? <span className={classes.required}>*</span> : ""}</label>
            }

            <select onChange={e => onChange(e.target.value)} id={id} required={required}>
                {/*<option value=""></option>*/}
                {values.map((value) => {
                    if (selectedValue != null) {
                        if (value.includes(selectedValue)) {
                            return <option selected={true} key={labelText + new Date() + value} value={value}>{value}</option>
                        }
                    }
                    return <option key={value} key={labelText + new Date() + value}>{value}</option>
                })}
            </select>
        </div>
    );
};

export default FormSelect;