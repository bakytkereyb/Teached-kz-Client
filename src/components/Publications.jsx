import React from 'react';
import BigText from "./UI/BigText/BigText";
import {lan} from "../constants/lan";
import Publication from "./Publication/Publication";

const Publications = () => {

    const publications = [0, 1, 2, 3, 4, 5]

    return (
        <div style={{padding: '60px 0 60px 0', backgroundColor: 'orange'}}>
            <BigText>{lan.publications}</BigText>
            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center'}}>
                {publications.map((index) =>
                    <Publication id={index}/>
                    )}
            </div>
        </div>
    );
};

export default Publications;