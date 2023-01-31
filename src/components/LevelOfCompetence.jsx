import React from 'react';
import BigText from "./UI/BigText/BigText";
import {lan} from "../constants/lan";

const LevelOfCompetence = () => {
    return (
        <div>
            <BigText>{lan.levelCompetence}</BigText>
            <p style={{
                display: 'flex',
                justifyContent: "center",
                margin: '20px 20% 0 20%',
                fontSize: '1.4rem',
                // backgroundColor: 'teal',
                textAlign: 'center'
            }}>
                Lorem ipsum dolor sit amet,
                consectetur adipiscing
                elit, sed do eiusmod
                tempor incididunt ut labore</p>
        </div>
    );
};

export default LevelOfCompetence;