import React from 'react';
import Block from "../components/UI/Block/Block";
import BigText from "../components/UI/BigText/BigText";
import {Content} from "antd/es/layout/layout";
import naruto from "../images/naruto.jpg"

const CompetencePage = () => {
    return (
        <Content
            style={{
                margin: '24px 16px 0',
                overflow: 'initial',
            }}
        >
            <Block>
                <BigText>CompetencePage</BigText>
                <BigText>CompetencePage</BigText>
                <BigText>CompetencePage</BigText>
                <img src={naruto} alt=""/>
            </Block>
        </Content>
    );
};

export default CompetencePage;