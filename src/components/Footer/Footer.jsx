import React from 'react';
import {clrs} from "../../constants/colors";
import cl from "./Footer.module.css";
import Text from "../UI/Text/Text";
import {lan} from "../../constants/lan";
import logo from "../../images/logo_TeachEd_1.svg";
import Select from "../UI/Select/Select";
import Button from "../UI/Button/Button";
import Logo from "../Logo/Logo";

const Footer = () => {
    return (
        <footer className={cl.footer} style={{backgroundColor: clrs.whiter}}>
            <div className={cl.wrapper}>
                <div className={cl.footer__svg}>
                    <Logo/>
                </div>
                <div className={cl.footer__left}>
                    <Text style={{color:clrs.blackBlue}}>{lan.aboutUs}</Text>
                    <Text style={{color:clrs.blackBlue}}>{lan.team}</Text>
                    <Text style={{color:clrs.blackBlue}}>{lan.publications}</Text>
                </div>
                <div className={cl.footer__right}>
                    <Text style={{color:clrs.blackBlue}}>email@email.com</Text>
                </div>
            </div>
        </footer>
    );
};

export default Footer;