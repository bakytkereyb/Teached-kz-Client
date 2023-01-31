import React from 'react';
import {clrs} from "../constants/colors";
import BigText from "./UI/BigText/BigText";
import {lan} from "../constants/lan";
import TeamMember from "./TeamMember/TeamMember";

const ProjectTeam = () => {
    return (
        <div style={{backgroundColor: clrs.projectTeamBackground, display: 'flex', flexDirection: 'column', padding: '60px 0 60px 0'}}>
            <div style={{marginBottom: '30px'}}>
                <BigText colorText='white'>{lan.projectTeam}</BigText>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center',  marginTop: '10px'}}>
                <TeamMember/>
                <TeamMember/>
                <TeamMember/>
            </div>
        </div>
    );
};

export default ProjectTeam;