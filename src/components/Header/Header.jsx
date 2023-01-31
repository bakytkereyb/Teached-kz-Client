import React from 'react';
import {lan} from "../../constants/lan";
import Text from "../UI/Text/Text";
import cl from "./Header.module.css"
import logo from "../../images/logo_TeachEd_1.svg"
import {clrs} from "../../constants/colors"
import Button from "../UI/Button/Button";
import Select from "../UI/Select/Select";


const Header = () => {
    return (
        <header style={{backgroundColor: clrs.headerBackground}}>
            <div className={cl.wrapper}>
                <div className={cl.header__left}>
                    <Text colorText={clrs.headerText}>{lan.aboutUs}</Text>
                    <Text colorText={clrs.headerText}>{lan.team}</Text>
                    <Text colorText={clrs.headerText}>{lan.publications}</Text>
                    <Text colorText={clrs.headerText}>{lan.contacts}</Text>
                </div>
                <div className={cl.header__svg}>
                    <img src={logo}/>
                </div>
                <div className={cl.header__right}>
                    <Text colorText={clrs.headerText}>email@email.com</Text>
                    <Select />
                    <Button colorText={clrs.white} colorBack={clrs.buttonLogIn}>Log in</Button>
                </div>
            </div>
        </header>
    );
};

export default Header;