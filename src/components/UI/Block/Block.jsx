import React from 'react';
import classes from './Block.module.css';

const Block = ({children, classNames, ...props}) => {
    return (
        <div id={props.id} className={classes.block}>
            <div style={props.style} className={[classes.block__inner, classNames].join(' ')}>
                {children}
            </div>
        </div>
    );
};

export default Block;