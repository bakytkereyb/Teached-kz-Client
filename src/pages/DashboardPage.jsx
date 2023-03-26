import React, {useEffect, useState} from 'react';
import {clrs} from "../constants/colors";
import HeaderPlatform from "../components/HeaderPlatform/HeaderPlatform";
import Block from "../components/UI/Block/Block";
import PageLoader from "../components/PageLoader/PageLoader";
import MyTasks from "../components/MyTasksCard/MyTasks";
import Course from "../components/CourseCard/Course";
import MyMasonry from "../components/Masonry/MyMasonry";
import {getUserByToken} from "../services/UserService";

const DashboardPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [userData, setUserData] = useState();
    useEffect(() => {
        const getUser = async () => {
            await getUserByToken().then(response => {
                setUserData(response.data);
                setLoading(response.status);
            }).catch(error => {
                window.location.assign('/');
                console.error(error);
            });
        }

        getUser();
    }, [])

    if (!isLoading || !userData) {
        return (
            <Block>
                <PageLoader/>
            </Block>
        )
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
    )
        ;
};

export default DashboardPage;