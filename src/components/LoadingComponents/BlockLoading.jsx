import React from 'react';
import classes from './BlockLoading.module.css';

const BlockLoading = ({isLoading}) => {
    if (!isLoading) {
        return '';
    }
    return (
        <div className={classes.blockLoading}>
            <div className={classes.loader}></div>
        </div>
    );
};

export default BlockLoading;