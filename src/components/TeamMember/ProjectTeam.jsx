import React from 'react';
import {clrs} from "../../constants/colors";
import BigText from "../UI/BigText/BigText";
import {lan} from "../../constants/lan";
import TeamMember from "./TeamMember";
import Block from "../UI/Block/Block";

const ProjectTeam = () => {
    return (

        <Block>
            <div style={{marginBottom: '30px'}}>
                <BigText colorText='white'>{lan.projectTeam}</BigText>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center',  marginTop: '10px'}}>
                <TeamMember/>
                <TeamMember/>
                <TeamMember/>
            </div>
        </Block>
    );
};

export default ProjectTeam;