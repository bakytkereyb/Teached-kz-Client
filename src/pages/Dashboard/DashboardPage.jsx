import React, {useEffect, useState} from 'react';
import {clrs} from "../../constants/colors";
import HeaderPlatform from "../../components/HeaderPlatform/HeaderPlatform";
import Block from "../../components/UI/Block/Block";
import MyTasks from "./MyTasksCard/MyTasks";
import Course from "../../components/CourseCard/Course";
import MyMasonry from "../../components/Masonry/MyMasonry";
import Card from "../../components/LoadingComponents/Card";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import MiniCalendar from "./MiniCalendar";
import {getAllTasks} from "../../store/slices/tasksSlice";

const DashboardPage = () => {
        const [isLoading, setLoading] = useState(false);
        const {admin} = useSelector(state => state.user.user);

        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            if (admin) {
                navigate('/admin/my');
            }
            dispatch(getAllTasks())
        }, [admin, navigate])

        if (isLoading) {
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
                        <Course/>
                        <Course/>
                        {/*<Course/>*/}
                        <Course pre={1}/>
                        {/*<Course pre={1}/>*/}
                        {/*<MyTasks/>*/}
                    </MyMasonry>
                </Block>
            </div>
        );
    }
;

export default DashboardPage;