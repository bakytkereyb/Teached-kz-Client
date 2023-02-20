import React from 'react';
import classes from './Sidebar.module.css';
import Logo from "../Logo/Logo";
import SidebarItem from "./SidebarItem";
import dashboard from '../../images/dashboard.svg';
import {lan} from "../../constants/lan";

const Sidebar = ({isOpen}) => {
    return (
        <div className={classes.sidebar} opened={isOpen ? "true" : "false"} >
            <Logo/>
            <br/>
            <SidebarItem icon={dashboard} text={lan.dashboard}/>
        </div>
    );
};

export default Sidebar;