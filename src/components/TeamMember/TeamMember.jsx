import React from 'react';
import rape from "../../images/naruto.jpg";
import cl from "./TeamMember.module.css"

const TeamMember = () => {
    return (
        <div className={cl.card}>
            <div className={cl.img}>
                <img src={rape} alt=""/>
            </div>
            <div className={cl.text}>
                <p style={{fontWeight: 'bold'}}>Utebayev Dias 1</p>
                <p style={{fontWeight: 'bold'}}>Front End Developer</p>
                <p>Project management, performing all phases according to the
                    project schedule and ensuring the necessary deliverables</p>
            </div>
        </div>
    );
};

export default TeamMember;