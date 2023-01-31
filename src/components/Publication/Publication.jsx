import React from 'react';
import {clrs} from "../../constants/colors";

const Publication = ({id, text}) => {
    return (
        <div style={{width: 'calc(26.66%)', backgroundColor: id%2 === 0 ? clrs.plsCardColor1 : clrs.plsCardColor2, margin: '20px 40px 20px 40px'}}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                padding: '20px',
                gap: '20px'
            }}>
                <p style={{textAlign: 'center', color: id%2 === 0 ? clrs.black : clrs.white}}>Correspondence between dental and skeletal maturity
                    parameters among patients with different sagittal relationships at the end of puberty
                    period, Journal of International Dental and Medical Research, 2020, 13(1), pp.
                    223–228</p>
            </div>
        </div>
    );
};

export default Publication;