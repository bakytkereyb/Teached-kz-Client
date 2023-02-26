import React, {useEffect, useState} from 'react';
import Block from "../components/UI/Block/Block";
import PageLoader from "../components/PageLoader/PageLoader";
import {clrs} from "../constants/colors";
import HeaderPlatform from "../components/HeaderPlatform/HeaderPlatform";
import Course from "../components/CourseCard/Course";
import BigText from "../components/UI/BigText/BigText";

const CoursesPage = () => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, []);

    if (isLoading) {
        return (
            <Block>
                <PageLoader/>
            </Block>
        )
    }

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px",flexWrap: "wrap", flexDirection: "row",justifyContent: 'center'}}>
                <Course/>
                <Course/>
                <Course/>
                <Course/>
                <Course/>
                <Course/>
                <Course/>
            </Block>
        </div>
    );
};

export default CoursesPage;