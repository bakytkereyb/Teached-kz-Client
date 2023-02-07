import React from 'react';
import {clrs} from "../../constants/colors";
import cl from "./Publication.module.css"

const Publication = ({text}) => {
    return (
        <div className={cl.card}>
            <p >{text}</p>
        </div>
    );
};

export default Publication;