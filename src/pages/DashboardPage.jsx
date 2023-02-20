import React from 'react';
import {clrs} from "../constants/colors";
import HeaderPlatform from "../components/HeaderPlatform/HeaderPlatform";
import Block from "../components/UI/Block/Block";
import BigText from "../components/UI/BigText/BigText";
import HorizontalDivider from "../components/UI/Divider/HorizontalDivider";

const DashboardPage = () => {

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px"}}>
                {/*  here  */}
            </Block>
        </div>
    );
};

export default DashboardPage;