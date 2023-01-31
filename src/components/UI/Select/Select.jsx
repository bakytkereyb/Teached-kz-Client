import React from 'react';
import cl from './Select.module.css'
const Select = ({options, changeLang}) => {
    return (
        <div >
            <select className={cl.select}>
                <option value="eng">ENG</option>
                <option value="ru">RU</option>
                <option value="kz">KZ</option>
            </select>
        </div>
    );
};

export default Select;