import React, {useState} from 'react';
import classes from './TabBlock.module.css';
import TabHeader from "./TabHeader";
import TabHeading from "./TabHeading";
import TabItem from "./TabItem";
import {useDispatch, useSelector} from "react-redux";

const TabBlock = ({headers, children}) => {

    const tabNum = useSelector(state => state.tabBlock.tabNum)
    const dispatch = useDispatch();

    return (
        <div className={classes.tabBlock}>
            <TabHeader>
                {headers.map((heading, i) => {
                    return <TabHeading
                        num={i}
                        key={heading}
                        active={tabNum === i ? "true" : "false"}
                        heading={heading}/>
                })}
            </TabHeader>
            {children}
        </div>
    );
};

export default TabBlock;