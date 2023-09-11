import React from 'react';
import classes from './Tooltip.module.css';
import {lan} from "../../constants/lan";

const Tooltip = ({componentName, realResult}) => {
    return (
        <div className={classes.mainBlock}>
            <div className={classes.headerComponentName}>
                <p>{componentName}</p>
            </div>
            <div className={classes.dataBlock}>
                <p>{lan.yourResult} :</p>
                <p className={classes.dataResult}>{realResult}</p>
            </div>
        </div>
    );
};

export default Tooltip;