import React from 'react';
import {Link} from "react-router-dom";
import logo from '../../images/logo_TeachEd_1.svg';
import classes from './Logo.module.css';

const Logo = (props) => {
    return (
        <a href={props.to} id={props.id} className={props.className}>
            <img style={props.style} className={classes.logo} src={logo} alt=""/>
        </a>
    );
};

export default Logo;