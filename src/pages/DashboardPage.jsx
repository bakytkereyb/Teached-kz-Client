import React, {useEffect, useState} from 'react';
import {clrs} from "../constants/colors";
import HeaderPlatform from "../components/HeaderPlatform/HeaderPlatform";
import Block from "../components/UI/Block/Block";
import PageLoader from "../components/PageLoader/PageLoader";
import MyTasks from "../components/MyTasksCard/MyTasks";
import Course from "../components/CourseCard/Course";
import MyMasonry from "../components/Masonry/MyMasonry";
import {getUserByToken} from "../services/UserService";
import Card from "../components/LoadingComponents/Card";

const DashboardPage = () => {
    const [isLoading, setLoading] = useState(true);

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
                    <MyTasks/>
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
};

export default DashboardPage;