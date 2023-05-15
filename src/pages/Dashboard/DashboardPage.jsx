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

const DashboardPage = () => {
        const [isLoading, setLoading] = useState(false);
        const {admin} = useSelector(state => state.user.user);

        const courses = useSelector(state => state.courses);

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
            dispatch(getAllMyCourses({ page: 1, limit: 5 }));
        }, [admin, navigate])

        if (courses.isLoading) {
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
                        <MiniCalendar/>
                        <MyTasks/>
                        {
                            courses.courses.map(course => {
                                return (
                                    <Course course={course} key={course.id}/>
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