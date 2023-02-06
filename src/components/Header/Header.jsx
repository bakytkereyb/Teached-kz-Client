import React, {useState} from 'react';
import {lan} from "../../constants/lan";
import Text from "../UI/Text/Text";
import cl from "./Header.module.css"
import {clrs} from "../../constants/colors"
import Button from "../UI/Button/Button";
import Select from "../UI/Select/Select";
import Logo from "../Logo/Logo";
import {Drawer} from "antd";
import burger from "../../images/hamburger.svg"


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
                    <img src={burger} alt="" onClick={showDrawer} />
                    <Logo style={{marginRight: "0 auto"}}/>
                </div>
                <Drawer
                    placement="left"
                    onClose={onClose} open={open}>
                    <p>Dias</p>
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