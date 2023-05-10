import React, {useState} from 'react';
import {clrs} from "../../../constants/colors";
import {useSelector} from 'react-redux';
import FlexBlock from '../../../components/UI/FlexBlock/FlexBlock';
import CourseViewSection from '../CourseView/CourseViewSection';
import CourseSection from '../CourseSection/CourseSection';


const CourseLessons = () => {

    const {course, isLoading} = useSelector(state => state.course);

    if (course === null) {
        return '';
    }

    return (
        <FlexBlock style={{
            backgroundColor: clrs.white,
            borderRadius: "15px",
            width: "calc(100% - 60px)",
            padding: "30px",
            flexDirection: "column",
            alignItems: "flex-start",
        }}>
            {
                course?.sections.map((section, i) => {
                    return (
                        <CourseSection key={section.id} section={section} />
                    )
                })
            }
            {
                course.userStatus === 'FINISHED' &&
                <CourseSection isCertificate={true} key={course.certificateSection.id} section={course.certificateSection}/>
            }

        </FlexBlock>
    );
};

export default CourseLessons;