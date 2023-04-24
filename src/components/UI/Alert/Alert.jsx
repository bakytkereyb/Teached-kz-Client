import React from 'react';

const Alert = ({children}) => {
    return (
        <div style={{
            width: "calc(100% - 30px)",
            padding: "15px",
            backgroundColor: "#d9edf7",
            borderColor: "#bce8f1",
            color: "#31708f"}}>
            {children}
        </div>
    );
};

export default Alert;