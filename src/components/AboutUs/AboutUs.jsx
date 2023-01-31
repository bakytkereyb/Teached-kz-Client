import React from 'react';
import AboutUsItem from "./AboutUsItem";
import {lan} from "../../constants/lan";
import BigText from "../UI/BigText/BigText";
import Block from "../UI/Block/Block";

const AboutUs = () => {
    const aboutUsItems = [1,2,3,4,5,6,7,8,9]
    return (
        <Block>
            <BigText>{lan.aboutUs}</BigText>
            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', padding: '10px'}}>
                {aboutUsItems.map(p =>
                    <AboutUsItem/>
                )}
            </div>
        </Block>

    );
};

export default AboutUs;