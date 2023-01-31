import React from 'react';
import classes from './InfoList.module.css';

const InfoList = (props) => {
    return (
        <div id={props.id} className={classes.infoList}>
            {props.children}
        </div>
    );
};

export default InfoList;