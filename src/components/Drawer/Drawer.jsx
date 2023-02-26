import React, {useState} from 'react';
import cl from './Drawer.module.css'
import Logo from "../Logo/Logo";
import DrawerItem from "./DrawerItem";
import {lan} from "../../constants/lan";
import FormSelect from "../Form/FormSelect";
import Button from "../UI/Button/Button";

const Drawer = ({isOpen}) => {
    const [selectedLan, setSelectedLan] = useState('ENG');

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
                    onChange={setSelectedLan}
                    id={"lan"}
                    required={true}
                    maxWidth={"200px"}
                    selectedValue={selectedLan}
                    withoutLabel={true}
                />
                <Button onClick={() => {
                    window.location.assign("/login")
                }}>{lan.login}</Button>
            </div>
        </div>
    );
};

export default Drawer;