import React, {useEffect, useState} from 'react';
import cl from './Drawer.module.css'
import Logo from "../Logo/Logo";
import DrawerItem from "./DrawerItem";
import {lan} from "../../constants/lan";
import FormSelect from "../Form/FormSelect";
import Button from "../UI/Button/Button";
import {getUserByToken} from "../../services/UserService";
import MyLink from "../UI/MyLink/MyLink";
import {useSelector} from "react-redux";

const Drawer = ({isOpen}) => {
    const user = useSelector(state => state.user.user);
    const [selectedLan, setSelectedLan] = useState({
        value: localStorage.getItem('lan'),
        label: localStorage.getItem('lan')
    });

    const changeLang = (selectedLang) => {
        localStorage.setItem('lan', selectedLang.value);
        setSelectedLan(selectedLang)
        window.location.reload();
    }

    return (
        <div className={cl.drawer} opened={isOpen ? 'true' : 'false'}>
            <Logo/>
            <br/>
            <DrawerItem to={"/#aboutUs"} text={lan.aboutUs}/>
            <DrawerItem to={"/#team"} text={lan.team}/>
            <DrawerItem to={"/#publications"} text={lan.publications}/>
            <DrawerItem to={"/#footer"} text={lan.contacts}/>
            <br/>
            <div style={{display: "flex", flexDirection: "column", gap: '20px'}}>
                {/*<FormSelect*/}
                {/*    labelText={"Язык"}*/}
                {/*    values={[*/}
                {/*        {*/}
                {/*            value: "ENG",*/}
                {/*            label: "ENG"*/}
                {/*        },*/}
                {/*        {*/}
                {/*            value: "РУС",*/}
                {/*            label: "РУС"*/}
                {/*        },*/}
                {/*        {*/}
                {/*            value: "ҚАЗ",*/}
                {/*            label: "ҚАЗ"*/}
                {/*        },*/}
                {/*    ]}*/}
                {/*    onChange={changeLang}*/}
                {/*    id={"lan"}*/}
                {/*    required={true}*/}
                {/*    maxWidth={"200px"}*/}
                {/*    selectedValue={selectedLan}*/}
                {/*    withoutLabel={true}*/}
                {/*/>*/}
                {
                    user === null ?
                        <MyLink to={"/login"}>{lan.log_in}</MyLink>
                        :
                        <MyLink to={"/my"}>{lan.cabinet}</MyLink>
                }
            </div>
        </div>
    );
};

export default Drawer;