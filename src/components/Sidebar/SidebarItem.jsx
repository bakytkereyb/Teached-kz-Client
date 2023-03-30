import React from 'react';
import Text from "../UI/Text/Text";
import classes from './Sidebar.module.css';
import {useNavigate} from "react-router-dom";

const SidebarItem = ({icon, text, to}) => {

    const navigate = useNavigate();

    function openPage() {
        if (to != null) {
            navigate(to);
        }

    }

    return (
        <div className={classes.item} onClick={openPage}>
            <div className={classes.itemIcon}>
                <img src={icon} alt=""/>
            </div>
            <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{text}</Text>
        </div>
    );
};

export default SidebarItem;