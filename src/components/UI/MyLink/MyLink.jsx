import React from 'react';
import {Link} from "react-router-dom";
import classes from './MyLink.module.css';
import {clrs} from "../../../constants/colors";

const MyLink = ({to, children, type}) => {

    if (type === 2) {
        return (
            <Link className={classes.button} to={to} style={{backgroundColor: clrs.blackBlue, color: clrs.white}}>
                {children}
            </Link>
        );
    }

    return (
        <Link className={classes.button} to={to} style={{backgroundColor: clrs.red, color: clrs.white}}>
            {children}
        </Link>
    );
};

export default MyLink;