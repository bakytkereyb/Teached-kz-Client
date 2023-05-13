import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {getPostCourseById} from '../../store/slices/postCourse/postCourseSlice';
import {clrs} from '../../constants/colors';
import HeaderPlatform from '../../components/HeaderPlatform/HeaderPlatform';
import Block from '../../components/UI/Block/Block';
import Card from '../../components/LoadingComponents/Card';
import BigText from '../../components/UI/BigText/BigText';
import {lan} from '../../constants/lan';
import PostCourseInfo from './PostCourseInfo/PostCourseInfo';
import PostCourseTabBtns from './PostCourseTabBtns/PostCourseTabBtns';
import PostCourseStudents from './PostCourseStudents/PostCourseStudents';
import PostCourseLessons from './PostCourseLessons';

const PostCoursePage = () => {
    const {course, isLoading} = useSelector(state => state.postCourse);
    const [tabNum, setTabNum] = useState(1);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {id} = useParams();

    useEffect(() => {
        dispatch(getPostCourseById({id: id}));
    }, [navigate]);

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
                <Block style={{marginTop: "50px"}}>
                    <BigText>{lan.postCourseNotFound}</BigText>
                </Block>
            </div>
        );
    }

    if (course.userStatus === 'FORBIDDEN') {
        return (
            <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
                <HeaderPlatform/>
                <Block style={{marginTop: "50px"}}>
                    <BigText>{lan.courseFORBIDDEN}</BigText>
                </Block>
            </div>
        );
    }


    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px"}}>
                <PostCourseInfo/>
                <PostCourseTabBtns tabNum={tabNum} setTabNum={setTabNum}/>

                {tabNum === 1 && <PostCourseLessons/>}
                {tabNum === 2 && <PostCourseStudents/>}
            </Block>
        </div>
    );
};

export default PostCoursePage;