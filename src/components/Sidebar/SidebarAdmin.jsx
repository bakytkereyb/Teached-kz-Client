import React from 'react';
import classes from './Sidebar.module.css';
import Logo from "../Logo/Logo";
import SidebarItem from "./SidebarItem";
import dashboard from '../../images/dashboard.svg';
import profile from '../../images/profile.svg';
import logout from '../../images/logout.svg'
import {lan} from "../../constants/lan";

const SidebarAdmin = ({isOpen}) => {
    return (
        <div className={classes.sidebar} opened={isOpen ? "true" : "false"}>
            <Logo/>
            <br/>
            <SidebarItem to={"/admin/my"} icon={dashboard} text={lan.competenceBank}/>
            <SidebarItem to={"/test"} icon={dashboard} text="Questionnaire"/>
            <SidebarItem to={"/admin/course"} icon={dashboard} text="Course"/>
            <SidebarItem to={"/admin/users"} icon={profile} text="Users"/>
            <SidebarItem to={"/logout"} icon={logout} text={lan.logout}/>
        </div>
    );
};

export default SidebarAdmin;