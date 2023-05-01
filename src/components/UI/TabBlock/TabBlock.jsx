import React, {useEffect, useLayoutEffect, useState} from 'react';
import classes from './TabBlock.module.css';
import TabHeader from "./TabHeader";
import TabHeading from "./TabHeading";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {resetTab} from "../../../store/slices/tabBlock/tabBlockSlice";

const TabBlock = ({headers, children}) => {

    const tabNum = useSelector(state => state.tabBlock.tabNum)
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useLayoutEffect(() => {
        dispatch(resetTab());
    }, [navigate])

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