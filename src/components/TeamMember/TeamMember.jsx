import React from 'react';
import rape from "../../images/naruto.jpg";
import cl from "./TeamMember.module.css"

const TeamMember = ({image, fullName, position, description}) => {
    return (
        <div className={cl.card}>
            <div className={cl.img}>
                <img src={image} alt=""/>
            </div>
            <div className={cl.text}>
                <p style={{fontWeight: 'bold'}}>{fullName}</p>
                <p style={{fontStyle: 'italic'}}>{position}</p>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default TeamMember;