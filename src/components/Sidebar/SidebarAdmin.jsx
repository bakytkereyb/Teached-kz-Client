import React, {useState} from 'react';
import classes from './Sidebar.module.css';
import Logo from "../Logo/Logo";
import SidebarItem from "./SidebarItem";
import dashboard from '../../images/dashboard.svg';
import course from '../../images/courses.svg';
import profile from '../../images/profile.svg';
import logout from '../../images/logout.svg'
import {lan} from "../../constants/lan";
import FormSelect from '../Form/FormSelect';

const SidebarAdmin = ({isOpen}) => {
    const changeLang = (selectedLang) => {
        localStorage.setItem('lan', selectedLang.value);
        setSelectedLan(selectedLang)
        window.location.reload();
    }

    const [selectedLan, setSelectedLan] = useState({
        value: localStorage.getItem('lan'),
        label: localStorage.getItem('lan')
    });

    return (
        <div className={classes.sidebar} opened={isOpen ? "true" : "false"}>
            <Logo/>
            <br/>
            <SidebarItem to={"/admin/my"} icon={dashboard} text={lan.competenceBank}/>
            <SidebarItem to={"/admin/course"} icon={course} text={lan.courses}/>
            <SidebarItem to={"/admin/users"} icon={profile} text={lan.users}/>
            <SidebarItem to={"/logout"} icon={logout} text={lan.logout}/>
            <br/>
            <FormSelect
                labelText={"Язык"}
                values={[
                    {
                        value: "ENG",
                        label: "ENG"
                    },
                    {
                        value: "РУС",
                        label: "РУС"
                    },
                    {
                        value: "ҚАЗ",
                        label: "ҚАЗ"
                    },
                ]}
                onChange={changeLang}
                id={"lan"}
                required={true}
                maxWidth={"200px"}
                selectedValue={selectedLan}
                withoutLabel={true}
            />
        </div>
    );
};

export default SidebarAdmin;