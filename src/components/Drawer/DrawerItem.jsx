import React from 'react';
import classes from "../Sidebar/Sidebar.module.css";
import Text from "../UI/Text/Text";

const DrawerItem = ({text, to}) => {
    function handleOnClick() {
        window.location.assign(to);
    }

    return (
        <div className={classes.item} onClick={handleOnClick}>
            <Text to={to} style={{textTransform: "uppercase", fontSize: "1rem"}}>{text}</Text>
        </div>
    );
};

export default DrawerItem;