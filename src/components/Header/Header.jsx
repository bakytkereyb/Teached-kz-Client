import React, {useEffect, useState} from 'react';
import {lan} from "../../constants/lan";
import Text from "../UI/Text/Text";
import cl from "./Header.module.css"
import {clrs} from "../../constants/colors"
import Button from "../UI/Button/Button";
import Logo from "../Logo/Logo";
import burger from "../../images/hamburger.svg"
import FormSelect from "../Form/FormSelect";
import Drawer from "../Drawer/Drawer";
import {getUserByToken} from "../../services/UserService";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../store/slices/userSlice";
import MyLink from "../UI/MyLink/MyLink";


const Header = () => {

    const user = useSelector(state => state.user.user);
    const [selectedLan, setSelectedLan] = useState(localStorage.getItem('lan'));
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    // Cookies.remove('Authorization');

    const changeLang = (selectedLang) => {
        localStorage.setItem('lan', selectedLang);
        setSelectedLan(selectedLang)
        window.location.reload();
    }

    return (
        <header className={cl.header}>
            <div className={cl.wrapper}>
                <div className={cl.menu}>
                    <img src={burger} alt="" onClick={toggleDrawer}/>
                </div>
                <Drawer isOpen={isOpen}/>
                {isOpen && <div className={cl.background_drawer} onClick={toggleDrawer}/>}
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
                        values={["ENG", "РУС", "ҚАЗ"]}
                        onChange={changeLang}
                        id={"lan"}
                        required={true}
                        maxWidth={"200px"}
                        selectedValue={selectedLan}
                        withoutLabel={true}
                    />
                    {
                        user === null ?
                            // <Button onClick={() => {
                            //     window.location.assign("/login")
                            // }}>{lan.log_in}</Button>
                            <MyLink to={"/login"}>{lan.log_in}</MyLink>
                            :
                            <MyLink to={"/my"}>{lan.cabinet}</MyLink>
                            // <Button onClick={() => {
                            //     window.location.assign("/my")
                            // }}>{lan.cabinet}</Button>

                    }
                </div>
            </div>
        </header>
    );
};

export default Header;