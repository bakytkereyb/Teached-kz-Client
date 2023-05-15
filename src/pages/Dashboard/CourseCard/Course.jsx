import React from 'react';
import cl from "./Course.module.css"
import Text from "../../../components/UI/Text/Text";
import arrowRight from "../../../images/arrow-circle-right.svg"
import {lan} from "../../../constants/lan";
import {LocalName} from '../../../utils/LocalName';
import {useNavigate} from 'react-router-dom';

const Course = ({course}) => {

    const navigate = useNavigate();

    function getPercentage(num, max) {
        return ((num / max) * 100).toFixed(2);
    }

    return (
        <div onClick={() => {navigate(`/course/${course.id}`)}} className={cl.card} style={{cursor: "pointer"}}>
            <div className={cl.top__card}>
                <Text>{LocalName.getName(course)}</Text>
                <img src={arrowRight} alt=""/>
            </div>
            <br/>
            <Text>{lan.progress} : {getPercentage(course.progress, course.maxProgress)} %</Text>
            <progress className={cl.progressBar} value={course.progress} max={course.maxProgress}/>
        </div>
    );
};

export default Course;