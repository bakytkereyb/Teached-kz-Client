import React, {useEffect, useState} from 'react';
import {clrs} from "../constants/colors";
import HeaderPlatform from "../components/HeaderPlatform/HeaderPlatform";
import Block from "../components/UI/Block/Block";
import BigText from "../components/UI/BigText/BigText";
import HorizontalDivider from "../components/UI/Divider/HorizontalDivider";
import PageLoader from "../components/PageLoader/PageLoader";

const DashboardPage = () => {

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, []);

    if (isLoading) {
        return (
            <Block>
                <PageLoader/>
            </Block>
        )
    }

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