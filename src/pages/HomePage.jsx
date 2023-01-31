import React from 'react';
import Header from "../components/Header/Header";
import BigText from "../components/UI/BigText/BigText";
import {lan} from "../constants/lan";
import Footer from "../components/Footer/Footer";
import Block from "../components/UI/Block/Block";
import InfoList from "../components/UI/InfoList/InfoList";
import img from '../images/naruto.jpg';
import InfoItem from "../components/UI/InfoList/InfoItem";
import TeamMember from "../components/TeamMember/TeamMember";
import {clrs} from "../constants/colors";


const HomePage = () => {

    return (
        <div>
            <Header/>
            <Block>
                <BigText>{lan.aboutUs}</BigText>
                <InfoList>
                    <InfoItem image={img} text={"Добавьте ваш товар в корзину и оформите заказ"}/>
                    <InfoItem image={img} text={"Мы выкупим ваш товар у поставщиков"}/>
                    <InfoItem image={img} text={"Мы доставим ваш товар до двери"}/>
                    <InfoItem image={img} text={"Мы доставим ваш товар до двери"}/>
                    <InfoItem image={img} text={"Мы доставим ваш товар до двери"}/>
                    <InfoItem image={img} text={"Мы доставим ваш товар до двери"}/>
                    <InfoItem image={img} text={"Мы доставим ваш товар до двери"}/>
                    <InfoItem image={img} text={"Мы доставим ваш товар до двери"}/>
                </InfoList>
            </Block>
            <Block>
                <BigText>{lan.levelCompetence}</BigText>
            </Block>

            <Block>
                <div style={{marginBottom: '30px'}}>
                    <BigText colorText='white'>{lan.projectTeam}</BigText>
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center',  marginTop: '10px'}}>
                    <TeamMember/>
                    <TeamMember/>
                    <TeamMember/>
                </div>
            </Block>

            <Block>
                <BigText>{lan.publications}</BigText>

            </Block>

            <Footer/>
        </div>
    );
};

export default HomePage;