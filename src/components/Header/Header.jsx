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
import Cookies from "js-cookie";


const Header = () => {
    const [selectedLan, setSelectedLan] = useState(Cookies.get('lan'));
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    // Cookies.remove('Authorization');
    const [username, setUsername] = useState(null);

    useEffect(() => {
        getUserByToken().then(response => {
            const userData = response.data;
            setUsername(userData.username)
        }).catch(error => {
            console.error(error);
            setUsername(null)
        });
    }, [])

    const changeLang = (selectedLang) => {
        Cookies.set('lan', selectedLang);
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
                        !username ?
                            <Button onClick={() => {
                                window.location.assign("/login")
                            }}>{lan.log_in}</Button>
                            :
                            <Button onClick={() => {
                                window.location.assign("/my")
                            }}>{lan.cabinet}</Button>
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;