import React from 'react';
import Text from "../UI/Text/Text";
import classes from './Sidebar.module.css';

const SidebarItem = ({icon, text, to}) => {
    return (
        <div className={classes.item}>
            <div className={classes.itemIcon}>
                <img src={icon} alt=""/>
            </div>
            <Text to={to} style={{textTransform: "uppercase", fontSize: "1rem"}}>{text}</Text>
        </div>
    );
};

export default SidebarItem;