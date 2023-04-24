import React, {useEffect, useState} from 'react';
import classes from './TabBlock.module.css';
import {useSelector} from "react-redux";

const TabItem = ({item, ...props}) => {

    const [active, setActive] = useState("false");
    const tabNum = useSelector(state => state.tabBlock.tabNum)

    useEffect(() => {
        if (item == tabNum) {
            setActive("true");
        } else {
            setActive("false");
        }
    }, [tabNum])

    return (
        <div item={item} active={active} className={classes.tabItem}>
            {props.children}
        </div>
    );
};

export default TabItem;