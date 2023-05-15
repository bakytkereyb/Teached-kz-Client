import React from 'react';
import Text from "../UI/Text/Text";
import classes from './Sidebar.module.css';
import {useNavigate} from "react-router-dom";

const SidebarItem = ({icon, text, to, isRed}) => {

    const navigate = useNavigate();

    const classesToAdd = [];

    if (isRed) {
        classesToAdd.push(classes.itemRed);
    }

    function openPage() {
        if (to != null) {
            navigate(to);
        }
    }

    return (
        <div className={[classes.item, [...classesToAdd]].join(' ')} onClick={openPage}>
            <div className={classes.itemIcon}>
                <img src={icon} alt=""/>
            </div>
            <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{text}</Text>
        </div>
    );
};

export default SidebarItem;