import React from 'react';
import rape from "../../images/naruto.jpg";
import cl from "./TeamMember.module.css"

const TeamMember = ({image, fullName, position, description, desc2}) => {
    return (
        <div className={cl.card}>
            <div className={cl.img}>
                <img src={image} alt=""/>
            </div>
            <div className={cl.text}>
                <p style={{fontWeight: 'bold'}}>{fullName}</p>
                <p style={{fontStyle: 'italic'}}>{position}</p>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <p>{description}</p>
                    <p>{desc2}</p>
                </div>

            </div>
        </div>
    );
};

export default TeamMember;