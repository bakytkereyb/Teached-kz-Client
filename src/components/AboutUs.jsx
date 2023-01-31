import React from 'react';
import AboutUsItem from "./AboutUsItem/AboutUsItem";
import {lan} from "../constants/lan";
import BigText from "./UI/BigText/BigText";

const AboutUs = () => {
    const aboutUsItems = [1,2,3,4,5,6,7,8,9]
    return (
        <div>
            <BigText>{lan.aboutUs}</BigText>
            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', padding: '10px'}}>
                {aboutUsItems.map(p =>
                    <AboutUsItem/>
                )}
            </div>
        </div>
    );
};

export default AboutUs;