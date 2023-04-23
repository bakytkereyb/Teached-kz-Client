import React, {useState} from 'react';
import classes from './HeaderPlatform.module.css';
import burger from '../../images/burger-nav-fill.svg';
import profile from '../../images/profile.svg';
import Sidebar from "../Sidebar/Sidebar";
import {getUserByToken} from "../../services/UserService";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const HeaderPlatform = () => {

    const [isOpenSidebar, setOpenSidebar] = useState(false);
    const navigate = useNavigate()

    const {username} = useSelector(state => state.user.user)


    return (
        <header className={classes.header}>
            <div className={classes.burger} onClick={() => {isOpenSidebar ? setOpenSidebar(false) : setOpenSidebar(true)}}>
                <img src={burger} alt=""/>
            </div>
            <div className={classes.burger} onClick={() => navigate(`/profile/${username}`)}>
                <img src={profile} alt=""/>
            </div>
            <Sidebar isOpen={isOpenSidebar}/>
        </header>
    );
};

export default HeaderPlatform;