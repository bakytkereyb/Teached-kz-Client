import React from 'react';
import FlexBlock from "../../components/UI/FlexBlock/FlexBlock";
import {lan} from "../../constants/lan";
import classes from './homepage.module.css';
import BigText from "../../components/UI/BigText/BigText";
import lupa from '../../images/magnifying-glass.svg';
import concept from '../../images/concept.svg';
import soft from '../../images/software-layout-header-complex2.svg';
import course from '../../images/e-learning-completed-course.svg';
import rise from '../../images/selection-raise-symbolic.svg';

const ProjectAim = () => {
    return (
        <FlexBlock style={{alignItems: "flex-start", justifyContent: "flex-start", flexDirection: "column"}}>
            <div className={classes.descBlock}>
                <p>{lan.projectDesc}</p>
            </div>
            <div className={classes.topicBlock}>
                <p className={classes.topic}>{lan.projectTopic}</p>
                <p className={classes.topicFull}>{lan.projectTopicFull}</p>
            </div>
            <div className={classes.aimBlock}>
                <span style={{fontWeight: 800}}>{lan.projectAim} </span>
                <span>{lan.projectAimFull}</span>
            </div>
            <p style={{fontWeight: 800}}>{lan.projectObjectives}:</p>
            <div className={classes.objBlock}>
                <img src={lupa} alt=""/>
                <p>{lan.obj1}</p>
            </div>
            <div className={classes.objBlock}>
                <img src={concept} alt=""/>
                <p>{lan.obj2}</p>
            </div>
            <div className={classes.objBlock}>
                <img src={soft} alt=""/>
                <p>{lan.obj3}</p>
            </div>
            <div className={classes.objBlock}>
                <img src={course} alt=""/>
                <p>{lan.obj4}</p>
            </div>
            <div className={classes.objBlock}>
                <img src={rise} alt=""/>
                <p>{lan.obj5}</p>
            </div>
        </FlexBlock>
    );
};

export default ProjectAim;