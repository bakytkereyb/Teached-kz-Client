import React from 'react';
import cl from "./Course.module.css"
import Text from "../../../components/UI/Text/Text";
import arrowRight from "../../../images/arrow-circle-right.svg"
import {LocalName} from '../../../utils/LocalName';
import {useNavigate} from 'react-router-dom';
import {lan} from "../../../constants/lan";

const Course = ({course, showProgress = true, type}) => {

    const navigate = useNavigate();


    function getPercentage(num, max) {
        return ((num / max) * 100).toFixed(2);
    }

    function setNavigatePath() {
        if(type === lan.littleTrainingCourse) {
            return `/course/${course.id}/view`
        } else {
            return `/${type}/${course.id}`
        }
    }

    return (
        <div onClick={() => {
            navigate(setNavigatePath())
        }} className={cl.card} style={{cursor: "pointer"}}>
            <div className={cl.top__card}>
                <Text>{LocalName.getName(course)} ({type})</Text>
                <img src={arrowRight} alt=""/>
            </div>

            {showProgress &&
                <>
                    <br/>
                    <Text> {lan.progress} : {getPercentage(course.progress, course.maxProgress)} %</Text>
                    <progress className={cl.progressBar} value={course.progress} max={course.maxProgress}/>
                </>
            }

        </div>
    );
};

export default Course;