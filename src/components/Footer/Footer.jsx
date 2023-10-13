import React from 'react';
import {clrs} from "../../constants/colors";
import cl from "./Footer.module.css";
import Text from "../UI/Text/Text";
import {lan} from "../../constants/lan";
import Logo from "../Logo/Logo";

const Footer = () => {
    return (
        <footer id={"footer"} className={cl.footer} style={{backgroundColor: clrs.whiter}}>
            <div className={cl.wrapper}>
                <div className={cl.footer__svg}>
                    <Logo to={"/"}/>
                </div>
                <div className={cl.footer__left}>
                    <Text to={"/#aboutUs"} style={{color: clrs.blackBlue}}>{lan.aboutUs}</Text>
                    <Text to={"/#team"} style={{color: clrs.blackBlue}}>{lan.team}</Text>
                    <Text to={"/#publications"} style={{color: clrs.blackBlue}}>{lan.publications}</Text>
                </div>
                <div className={cl.footer__right}>
                    <Text style={{color:clrs.blackBlue}}>teached@gmail.com</Text>
                </div>
            </div>
        </footer>
    );
};

export default Footer;