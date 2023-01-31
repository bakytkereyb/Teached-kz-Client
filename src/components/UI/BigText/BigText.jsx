import React from 'react';
import cl from './BigText.module.css'

const BigText = ({children, colorText}) => {
    return (
        <div className={cl.bigText}>
            {colorText ?
                <h1 style={{color: colorText}}>{children}</h1>
                :
                <h1>{children}</h1>
            }
        </div>
    );
};

export default BigText;