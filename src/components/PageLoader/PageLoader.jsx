import React from 'react';
import classes from './PageLoader.module.css';

const PageLoader = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.circle}></div>
            <div className={classes.circle}></div>
            <div className={classes.circle}></div>
            <div className={classes.shadow}></div>
            <div className={classes.shadow}></div>
            <div className={classes.shadow}></div>
        </div>
    );
};

export default PageLoader;