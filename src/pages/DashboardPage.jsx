import React, {useState} from 'react';
import Block from "../components/UI/Block/Block";
import {Content} from "antd/es/layout/layout";
import BigText from "../components/UI/BigText/BigText";
import naruto from "../images/naruto.jpg"

const DashboardPage = () => {

    const [bat, setBat] = useState('baty');

    return (
        <Content
            style={{
                margin: '24px 16px 0',
                overflow: 'initial',
            }}
        >
            <Block>
                <BigText>Dashboard Page</BigText>
                <BigText>Dashboard</BigText>
                <BigText>Dashboard</BigText>
                <img src={naruto} alt=""/>
            </Block>
        </Content>
    );
};

export default DashboardPage;