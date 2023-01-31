import React from 'react';
import {clrs} from "../../constants/colors";
import cl from "./Footer.module.css";
import Text from "../UI/Text/Text";
import {lan} from "../../constants/lan";
import logo from "../../images/logo_TeachEd_1.svg";
import Select from "../UI/Select/Select";
import Button from "../UI/Button/Button";

const Footer = () => {
    return (
        <footer style={{backgroundColor: clrs.headerBackground}}>
            <div className={cl.wrapper}>
                <div className={cl.footer__svg}>
                    <img src={logo}/>
                </div>
                <div className={cl.footer__left}>
                    <Text colorText={clrs.headerText}>{lan.aboutUs}</Text>
                    <Text colorText={clrs.headerText}>{lan.team}</Text>
                    <Text colorText={clrs.headerText}>{lan.publications}</Text>
                </div>
                <div className={cl.footer__right}>
                    <Text colorText={clrs.headerText}>email@email.com</Text>
                </div>
            </div>
        </footer>
    );
};

export default Footer;