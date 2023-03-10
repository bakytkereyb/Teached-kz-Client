import React from 'react';
import Text from "../UI/Text/Text";
import classes from './Sidebar.module.css';

const SidebarItem = ({icon, text, to}) => {

    function openPage() {
        if (to != null) {
            window.location.assign(to);
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