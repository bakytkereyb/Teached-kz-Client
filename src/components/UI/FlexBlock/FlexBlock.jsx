import React, {forwardRef} from 'react';
import classes from './FlexBlock.module.css';

const FlexBlock = forwardRef((props, ref) => (
    <div ref={ref} className={classes.flexBlock} style={props.style}>
        {props.children}
    </div>
));

export default FlexBlock;