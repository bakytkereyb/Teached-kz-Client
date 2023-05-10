import React, {useEffect, useState} from 'react';
import {clrs} from "../../../constants/colors";
import HeaderPlatform from "../../../components/HeaderPlatform/HeaderPlatform";
import Block from "../../../components/UI/Block/Block";
import Card from "../../../components/LoadingComponents/Card";
import CourseHeader from "../CourseHeader/CourseHeader";
import {lan} from "../../../constants/lan";
import CourseViewButtons from "./CourseViewButtons";
import CourseViewInfo from "./CourseViewInfo";
import CourseViewLessons from "./CourseViewLessons";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getCourseById} from "../../../store/slices/course/courseSlice";
import BigText from "../../../components/UI/BigText/BigText";

const CourseView = () => {

    const {course, isLoading} = useSelector(state => state.course);
    const [tabNum, setTabNum] = useState(1);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {id} = useParams();

    useEffect(() => {
        dispatch(getCourseById({id: id}));
    }, [navigate]);

    useEffect(() => {
        console.log(course)
    }, [course]);

    if (isLoading) {
        return (
            <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
                <HeaderPlatform/>
                <Block style={{marginTop: "50px"}}>
                    <Card type={"horizontal-circle"}/>
                    <Card type={"horizontal-small"}/>
                    <Card type={"horizontal"}/>
                </Block>
            </div>
        );
    }

    if (course === null) {
        return (
            <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
                <HeaderPlatform/>
                <Block style={{marginTop: "50px"}}>
                    <BigText>{lan.courseNotFound}</BigText>
                </Block>
            </div>
        );
    }


    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px"}}>
                <CourseHeader/>
                <CourseViewInfo/>
                <CourseViewButtons tabNum={tabNum} setTabNum={setTabNum}/>

                {tabNum === 1 && <CourseViewLessons/>}
            </Block>
        </div>
    );
};

export default CourseView;