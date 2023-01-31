import React from 'react';
import BigText from "./UI/BigText/BigText";
import {lan} from "../constants/lan";
import Block from "./UI/Block/Block";

const LevelOfCompetence = () => {
    return (
        <Block>
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
        </Block>
    );
};

export default LevelOfCompetence;