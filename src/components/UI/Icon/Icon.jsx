import React from 'react';

const Icon = ({src, ...props}) => {
    return (
        <div onClick={props.onClick} style={{...{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "20px",
            height: "20px",
        }, ...props.style}}>
            <img src={src} alt="" style={{
                maxWidth: "100%",
                maxHeight: "100%"
            }}/>
        </div>
    );
};

export default Icon;