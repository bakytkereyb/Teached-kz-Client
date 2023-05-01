import React from 'react';
import classes from './Sidebar.module.css';
import Logo from "../Logo/Logo";
import SidebarItem from "./SidebarItem";
import dashboard from '../../images/dashboard.svg';
import courses from '../../images/courses.svg';
import competence from '../../images/competence.svg'
import tasks from '../../images/tasks.svg'
import chats from '../../images/comment.svg'
import calendar from '../../images/calendar.svg'
import setting from '../../images/settings.svg'
import logout from '../../images/logout.svg'
import {lan} from "../../constants/lan";

const SidebarAdmin = ({isOpen}) => {
    return (
        <div className={classes.sidebar} opened={isOpen ? "true" : "false"} >
            <Logo/>
            <br/>
            <SidebarItem to={"/admin/my"} icon={dashboard} text={lan.competenceBank}/>
            <SidebarItem to={"/logout"} icon={logout} text={lan.logout}/>
        </div>
    );
};

export default SidebarAdmin;