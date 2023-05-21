import React, {useEffect, useState} from 'react';
import {clrs} from "../../constants/colors";
import HeaderPlatform from "../../components/HeaderPlatform/HeaderPlatform";
import Block from "../../components/UI/Block/Block";
import MyTasks from "./MyTasksCard/MyTasks";
import Course from "./CourseCard/Course";
import MyMasonry from "../../components/Masonry/MyMasonry";
import Card from "../../components/LoadingComponents/Card";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import MiniCalendar from "./MiniCalendar";
import {getAllTasks} from "../../store/slices/tasksSlice";
import {getAllMyCourses} from '../../store/slices/coursesSlice';
import {getAllTrainingCourses} from "../../store/slices/trainingCoursesSlice";
import {getAllMyPostCourses} from "../../store/slices/postCoursesSlice";
import {lan} from "../../constants/lan";
import CompetenceMap from './competenceMap/CompetenceMap';

const DashboardPage = () => {
        const [isLoading, setLoading] = useState(false);
        const {admin} = useSelector(state => state.user.user);

        const courses = useSelector(state => state.courses);
        const trainingCourses = useSelector(state => state.trainingCourses);
        const postCourses = useSelector(state => state.post_courses);

        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            console.log(courses);
        }, [courses])

        useEffect(() => {
            if (admin) {
                navigate('/admin/my');
            }
            dispatch(getAllTasks())
            dispatch(getAllMyCourses({page: 1, limit: 5}));
            dispatch(getAllTrainingCourses({page: 1, limit: 5}));
            dispatch(getAllMyPostCourses({page: 1, limit: 5}));
        }, [admin, navigate])

        if (courses.isLoading && trainingCourses.isLoading && postCourses.isLoading) {
            return (
                <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
                    <HeaderPlatform/>
                    <Block style={{marginTop: "50px"}}>
                        <MyMasonry>
                            <Card type={"calendar"}/>
                            <Card/>
                            <Card type={"big-card"}/>
                            <Card/>
                            <Card/>
                            <Card/>
                        </MyMasonry>
                    </Block>
                </div>
            );
        }


        return (
            <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
                <HeaderPlatform/>
                <Block style={{marginTop: "50px"}}>
                    <MyMasonry>
                        <CompetenceMap/>
                        <MiniCalendar/>
                        <MyTasks/>
                        {
                            courses.courses.map(course => {
                                return (
                                    <Course course={course} key={course.id} type={lan.littleCourse}/>
                                )
                            })
                        }
                        {
                            trainingCourses.trainingCourses.map(course => {
                                return (
                                    <Course course={course} key={course.id} showProgress={false} type={lan.littleTrainingCourse}/>
                                )
                            })
                        }
                        {
                            postCourses?.courses.map(course => {
                                return (
                                    <Course course={course} key={course.id} showProgress={false} type={lan.littlePostCourse}/>
                                )
                            })
                        }
                    </MyMasonry>
                </Block>
            </div>
        );
    }
;

export default DashboardPage;