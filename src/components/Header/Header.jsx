import React, {useState} from 'react';
import {lan} from "../../constants/lan";
import Text from "../UI/Text/Text";
import cl from "./Header.module.css"
import {clrs} from "../../constants/colors"
import Button from "../UI/Button/Button";
import Select from "../UI/Select/Select";
import Logo from "../Logo/Logo";
import {Divider, Drawer} from "antd";
import burger from "../../images/hamburger.svg"
import BigText from "../UI/BigText/BigText";


const Header = () => {

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <header className={cl.header}>
            <div className={cl.wrapper}>
                <div className={cl.menu}>
                    <img src={burger} alt="" onClick={showDrawer}/>
                </div>
                <Drawer
                    placement="left"
                    closable={false}
                    onClose={onClose} open={open}>
                    <div className={cl.menu__items}>
                        <Logo/>
                        <Divider>CONTENT</Divider>
                        <BigText style={{color: clrs.blackBlue}}>{lan.aboutUs}</BigText>
                        <BigText style={{color: clrs.blackBlue}}>{lan.team}</BigText>
                        <BigText style={{color: clrs.blackBlue}}>{lan.publications}</BigText>
                        <BigText style={{color: clrs.blackBlue}}>{lan.contacts}</BigText>
                        <BigText style={{color: clrs.blackBlue}}>email@email.com</BigText>
                        <Divider />
                        <Select/>
                        <Button colorText={clrs.white} colorBack={clrs.red}>Log in</Button>
                    </div>
                </Drawer>
                <div className={cl.header__left}>
                    <Text style={{color: clrs.blackBlue}}>{lan.aboutUs}</Text>
                    <Text style={{color: clrs.blackBlue}}>{lan.team}</Text>
                    <Text style={{color: clrs.blackBlue}}>{lan.publications}</Text>
                    <Text style={{color: clrs.blackBlue}}>{lan.contacts}</Text>
                </div>
                <div className={cl.header__svg}>
                    <Logo/>
                </div>
                <div className={cl.header__right}>
                    <Text style={{color: clrs.blackBlue}}>email@email.com</Text>
                    <Select/>
                    <Button colorText={clrs.white} colorBack={clrs.red}>Log in</Button>
                </div>
            </div>
        </header>
    );
};

export default Header;