import React, {useState} from 'react';
import classes from './HeaderPlatform.module.css';
import burger from '../../images/burger-nav-fill.svg';
import profile from '../../images/profile.svg';
import Sidebar from "../Sidebar/Sidebar";

const HeaderPlatform = () => {

    const [isOpenSidebar, setOpenSidebar] = useState(false);

    return (
        <header className={classes.header}>
            <div className={classes.burger} onClick={() => {isOpenSidebar ? setOpenSidebar(false) : setOpenSidebar(true)}}>
                <img src={burger} alt=""/>
            </div>
            <div className={classes.burger}>
                <img src={profile} alt=""/>
            </div>
            <Sidebar isOpen={isOpenSidebar}/>
        </header>
    );
};

export default HeaderPlatform;