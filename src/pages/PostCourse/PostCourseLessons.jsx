import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import FlexBlock from '../../components/UI/FlexBlock/FlexBlock';
import {clrs} from '../../constants/colors';
import PostCourseSection from './PostCourseSection';

const PostCourseLessons = () => {
    const {course, isLoading} = useSelector(state => state.postCourse);

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
                        <PostCourseSection key={section.id} section={section}/>
                    )
                })
            }

        </FlexBlock>
    );
};

export default PostCourseLessons;