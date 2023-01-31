import React from 'react';
import BigText from "../UI/BigText/BigText";
import {lan} from "../../constants/lan";
import Publication from "./Publication";
import Block from "../UI/Block/Block";

const Publications = () => {

    const publications = [0, 1, 2, 3, 4, 5]

    return (
        <Block>
            <BigText>{lan.publications}</BigText>
            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center'}}>
                {publications.map((index) =>
                    <Publication id={index}/>
                    )}
            </div>
        </Block>
    );
};

export default Publications;