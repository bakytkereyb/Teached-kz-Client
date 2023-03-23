import React, {useState} from 'react';
import cl from './Drawer.module.css'
import Logo from "../Logo/Logo";
import DrawerItem from "./DrawerItem";
import {lan} from "../../constants/lan";
import FormSelect from "../Form/FormSelect";
import Button from "../UI/Button/Button";
import {getUserByToken} from "../../services/UserService";
import Cookies from "js-cookie";

const Drawer = ({isOpen}) => {
    const [selectedLan, setSelectedLan] = useState('ENG');

    const [username,setUsername] = useState(null);

    getUserByToken().then(response => {
        const userData = response.data;
        setUsername(userData.username)
    }).catch(error => {
        console.error(error);
        setUsername(null)
    });

    const changeLang = (selectedLang) => {
        Cookies.set('lan', selectedLang);
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
    );
};

export default Drawer;