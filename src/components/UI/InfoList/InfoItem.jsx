import React from 'react';
import classes from './InfoList.module.css';

const InfoItem = ({image, text}) => {
    return (
        <div className={classes.infoItem}>
            <div className={classes.infoItemImage}>
                <img src={image} alt=""/>
            </div>
            <p>{text}</p>
        </div>
    );
};

export default InfoItem;