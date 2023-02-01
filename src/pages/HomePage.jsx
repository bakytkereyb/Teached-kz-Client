import React, {useState} from 'react';
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
import FormBlock from "../components/Form/FormBlock";
import FormInput from "../components/Form/FormInput";
import Button from "../components/UI/Button/Button";
import Publication from "../components/Publication/Publication";


const HomePage = () => {

    const [username, setUsername] = useState('');

    function onSubmitLogin(e) {
        e.preventDefault();
    }

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

            <Block tyle={{backgroundColor: clrs.green}}>
                <div style={{marginBottom: '30px'}}>
                    <BigText colorText='white'>{lan.projectTeam}</BigText>
                </div>
                <InfoList>
                    <TeamMember/>
                    <TeamMember/>
                    <TeamMember/>
                </InfoList>
            </Block>

            <Block>
                <BigText>{lan.publications}</BigText>
                <InfoList>
                    <Publication/>
                    <Publication/>
                    <Publication/>
                    <Publication/>
                    <Publication/>
                    <Publication/>
                </InfoList>

            </Block>

            <Block s>
                <FormBlock onSubmit={onSubmitLogin}>
                    <FormInput
                        labelText={"Username"}
                        value={username}
                        onChange={setUsername}
                        id={"username"}
                        type={"text"}
                        required={true}
                        maxWidth={"50%"}
                    />

                    <Button type={2}>Login</Button>
                </FormBlock>
            </Block>

            <Footer/>
        </div>
    );
};

export default HomePage;