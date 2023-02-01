import React from 'react';
import {clrs} from "../../constants/colors";
import cl from "./Publication.module.css"

const Publication = ({id, text}) => {
    return (
        <div className={cl.card} style={{backgroundColor: id % 2 === 0 ? clrs.silver : clrs.green}}>
            <p style={{color: id % 2 === 0 ? clrs.black : clrs.white}}>Correspondence between
                dental and skeletal maturity
                parameters among patients with different sagittal relationships at the end of puberty
                period, Journal of International Dental and Medical Research, 2020, 13(1), pp.
                223–228</p>
        </div>
    );
};

export default Publication;