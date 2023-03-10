import React from 'react';
import Text from "../UI/Text/Text";
import courses from "../../images/courses.svg";
import cl from "./CourseLessons.module.css"

const Lesson = ({props}) => {
    return (
        <div style={{width: '100%'}}>
            <div className={cl.lessonHeaderText}>
                <Text>Introduction</Text>
            </div>
            <div className={cl.lessonContent}>
                <div className={cl.lessonItem}>
                    <img src={courses} alt=""/>
                    <Text>Syllabus</Text>
                </div>
                <div className={cl.lessonItem}>
                    <img src={courses} alt=""/>
                    <Text>Assignment 1</Text>
                </div>
                <div className={cl.lessonItem}>
                    <img src={courses} alt=""/>
                    <Text>Test</Text>
                </div>
            </div>
        </div>
    );
};

export default Lesson;