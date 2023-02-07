import React, {useState} from 'react';
import {lan} from "../../constants/lan";
import Text from "../UI/Text/Text";
import cl from "./Header.module.css"
import {clrs} from "../../constants/colors"
import Button from "../UI/Button/Button";
import Logo from "../Logo/Logo";
import {Divider, Drawer} from "antd";
import burger from "../../images/hamburger.svg"
import BigText from "../UI/BigText/BigText";
import FormSelect from "../Form/FormSelect";


const Header = () => {
    const [selectedLan, setSelectedLan] = useState('ENG');
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
                        <Logo to={"/"}/>
                        <br/>
                        <Text to={"/#aboutUs"} style={{color: clrs.blackBlue}}>{lan.aboutUs}</Text>
                        <Text to={"/#team"} style={{color: clrs.blackBlue}}>{lan.team}</Text>
                        <Text to={"/#publications"} style={{color: clrs.blackBlue}}>{lan.publications}</Text>
                        <Text to={"/#footer"} style={{color: clrs.blackBlue}}>{lan.contacts}</Text>
                        <Text style={{color: clrs.blackBlue}}>email@email.com</Text>
                        <br/>
                        <FormSelect
                            labelText={"Язык"}
                            values={["ENG","РУС","ҚАЗ"]}
                            onChange={setSelectedLan}
                            id={"lan"}
                            required={true}
                            maxWidth={"200px"}
                            selectedValue={selectedLan}
                            withoutLabel={true}
                        />
                        <Button onClick={() => {window.location.assign("/login")}}>Log in</Button>
                    </div>
                </Drawer>
                <div className={cl.header__left}>
                    <Text to={"/#aboutUs"} style={{color: clrs.blackBlue}}>{lan.aboutUs}</Text>
                    <Text to={"/#team"} style={{color: clrs.blackBlue}}>{lan.team}</Text>
                    <Text to={"/#publications"} style={{color: clrs.blackBlue}}>{lan.publications}</Text>
                    <Text to={"/#footer"} style={{color: clrs.blackBlue}}>{lan.contacts}</Text>
                </div>
                <div className={cl.header__svg}>
                    <Logo to={"/"}/>
                </div>
                <div className={cl.header__right}>
                    <Text style={{color: clrs.blackBlue}}>email@email.com</Text>
                    <FormSelect
                        labelText={"Язык"}
                        values={["ENG","РУС","ҚАЗ"]}
                        onChange={setSelectedLan}
                        id={"lan"}
                        required={true}
                        maxWidth={"200px"}
                        selectedValue={selectedLan}
                        withoutLabel={true}
                    />
                    <Button onClick={() => {window.location.assign("/login")}}>Log in</Button>
                </div>
            </div>
        </header>
    );
};

export default Header;