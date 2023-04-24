import React from 'react';
import classes from './TabBlock.module.css';
import {useDispatch} from "react-redux";
import {setTab} from "../../../store/slices/tabBlock/tabBlockSlice";

const TabHeading = ({heading, active, num}) => {

    const dispatch = useDispatch();

    function selectHeading(e) {
        dispatch(setTab(num));
    }

    return (
        <p onClick={selectHeading} num={num} active={active}>
            {heading}
        </p>
    );
};

export default TabHeading;