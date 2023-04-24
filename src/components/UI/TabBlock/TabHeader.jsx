import React from 'react';
import classes from './TabBlock.module.css';

const TabHeader = (props) => {
    return (
        <div className={classes.tabHeader}>
            {props.children}
        </div>
    );
};

export default TabHeader;