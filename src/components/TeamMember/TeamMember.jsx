import React from 'react';
import {clrs} from "../../constants/colors";
import naruto from "../../images/naruto.jpg";

const TeamMember = () => {
    return (
        <div style={{width: 'calc(26.66%)', backgroundColor: clrs.white, margin: '20px 40px 20px 40px'}}>
            <div style={{height: '350px'}}>
                <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={naruto} alt=""/>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                padding: '20px',
                gap: '20px'
            }}>
                <p style={{textAlign: 'center', fontWeight: 'bold'}}>Utebayev Dias 1</p>
                <p style={{textAlign: 'center', fontWeight: 'bold'}}>Front End Developer</p>
                <p style={{textAlign: 'center'}}>Project management, performing all phases according to the
                    project schedule and ensuring the necessary deliverables</p>
            </div>
        </div>
    );
};

export default TeamMember;