import React from 'react';
import classes from './BlockLoading.module.css';

const BlockLoading = ({isLoading, ...props}) => {
    if (!isLoading) {
        return '';
    }
    return (
        <div style={props.style} className={classes.blockLoading}>
            <div className={classes.loader}></div>
        </div>
    );
};

export default BlockLoading;