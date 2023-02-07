import React from 'react';
import BigText from "../components/UI/BigText/BigText";
import {lan} from "../constants/lan";
import Footer from "../components/Footer/Footer";
import Block from "../components/UI/Block/Block";
import InfoList from "../components/UI/InfoList/InfoList";
import img from '../images/naruto.jpg';
import InfoItem from "../components/UI/InfoList/InfoItem";
import TeamMember from "../components/TeamMember/TeamMember";
import {clrs} from "../constants/colors";
import Publication from "../components/Publication/Publication";
import Header from "../components/Header/Header";
import naruto from "../images/naruto.jpg";
import Banner from "../components/Banner/Banner";


const HomePage = () => {

    return (
        <div>
            <Header/>
            <Banner/>
            <Block id={"aboutUs"}>
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

            <Block id={"team"} style={{backgroundColor: clrs.green}}>
                <div style={{marginBottom: '30px'}}>
                    <BigText style={{color:clrs.white}}>{lan.projectTeam}</BigText>
                </div>
                <InfoList>
                    <TeamMember
                        image={naruto}
                        fullName={"Bakytkereiuly Batyrbek"}
                        position={"Backend Developer"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad alias hic magnam non officiis."}/>
                    <TeamMember
                        image={naruto}
                        fullName={"Bakytkereiuly Batyrbek"}
                        position={"Backend Developer"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad alias hic magnam non officiis."}/>
                    <TeamMember
                        image={naruto}
                        fullName={"Bakytkereiuly Batyrbek"}
                        position={"Backend Developer"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad alias hic magnam non officiis."}/>
                    <TeamMember
                        image={naruto}
                        fullName={"Bakytkereiuly Batyrbek"}
                        position={"Backend Developer"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad alias hic magnam non officiis."}/>
                    <TeamMember
                        image={naruto}
                        fullName={"Bakytkereiuly Batyrbek"}
                        position={"Backend Developer"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad alias hic magnam non officiis."}/>
                    <TeamMember
                        image={naruto}
                        fullName={"Bakytkereiuly Batyrbek"}
                        position={"Backend Developer"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad alias hic magnam non officiis."}/>
                </InfoList>
            </Block>

            <Block id={"publications"}>
                <BigText>{lan.publications}</BigText>
                <InfoList>
                    <Publication text={"Correspondence between dental and skeletal maturity parameters among patients with different sagittal relationships at the end of puberty period, Journal of International Dental and Medical Research, 2020, 13(1), pp. 223–228"}/>
                    <Publication text={"Correspondence between dental and skeletal maturity parameters among patients with different sagittal relationships at the end of puberty period, Journal of International Dental and Medical Research, 2020, 13(1), pp. 223–228"}/>
                    <Publication text={"Correspondence between dental and skeletal maturity parameters among patients with different sagittal relationships at the end of puberty period, Journal of International Dental and Medical Research, 2020, 13(1), pp. 223–228"}/>
                    <Publication text={"Correspondence between dental and skeletal maturity parameters among patients with different sagittal relationships at the end of puberty period, Journal of International Dental and Medical Research, 2020, 13(1), pp. 223–228"}/>
                    <Publication text={"Correspondence between dental and skeletal maturity parameters among patients with different sagittal relationships at the end of puberty period, Journal of International Dental and Medical Research, 2020, 13(1), pp. 223–228"}/>
                    <Publication text={"Correspondence between dental and skeletal maturity parameters among patients with different sagittal relationships at the end of puberty period, Journal of International Dental and Medical Research, 2020, 13(1), pp. 223–228"}/>
                </InfoList>

            </Block>
            <Footer/>
        </div>
    );
};

export default HomePage;