import React, {useState} from 'react';
import {clrs} from "../constants/colors";
import HeaderPlatform from "../components/HeaderPlatform/HeaderPlatform";
import Block from "../components/UI/Block/Block";
import naruto from "../images/naruto.jpg"
import Text from "../components/UI/Text/Text";
import Button from "../components/UI/Button/Button";
import {lan} from "../constants/lan";
import CourseLessons from "../components/CourseLessons/CourseLessons";
import CourseStudents from "../components/CourseStudents/CourseStudents";
import CourseTasks from "../components/CourseTasks/CourseTasks";
import CourseHeader from "../components/CourseHeader/CourseHeader";
import CourseButtons from "../components/CourseHeader/CourseButtons";
import CoursePosts from "../components/CoursePosts/CoursePosts";
import CourseTests from "../components/CourseTests/CourseTests";

const CoursePage = ({task, student, post, test, lesson}) => {

    const [isComponent, setIsComponent] = useState(1);

    const tasks = [
        {name: 'Java', id: 1, index: "1", complete: true},
        {name: 'Sarah', id: 2, index: "2"},
        {name: 'Dias', id: 3, index: "3", complete: true},
        {name: 'Baty', id: 4, index: "4"},
    ];

    const students = [
        {name: 'Batyrbek', id: 1, surname: "Bakytkereiuly"},
        {name: 'Omirserik', id: 2, surname: "Beisenbayev"},
        {name: 'Dias', id: 3, surname: "Utebayev"},
        {name: 'Cristiano', id: 4, surname: "Ronaldo"},
    ];

    const setComponentIndex = (index) => {
        setIsComponent(index)
    }



    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px"}}>
                <CourseHeader/>
                <CourseButtons index={setComponentIndex}/>
                {isComponent === 1 && <CourseLessons/>}
                {isComponent === 2 && <CourseStudents students={students}/>}
                {isComponent === 3 && <CourseTasks tasks={tasks}/>}
                {isComponent === 4 && <CoursePosts/>}
                {isComponent === 5 && <CourseTests/>}
            </Block>
        </div>
    );
};

export default CoursePage;