import React from 'react';
import {useSelector} from 'react-redux';
import FlexBlock from '../../../components/UI/FlexBlock/FlexBlock';
import {clrs} from '../../../constants/colors';
import Text from '../../../components/UI/Text/Text';
import {lan} from '../../../constants/lan';
import {LocalName} from '../../../utils/LocalName';

const PostCourseInfo = () => {
    const {course, isLoading} = useSelector(state => state.postCourse);

    return (
        <FlexBlock style={{
            backgroundColor: clrs.white,
            borderRadius: "15px",
            width: "calc(100% - 60px)",
            padding: "30px",
            flexDirection: "column",
            alignItems: "flex-start",
        }}>
            <Text normalWeight default><b>{lan.postCourse}:</b> {LocalName.getName(course)}</Text>
            <Text normalWeight default><b>{lan.description}:</b> {LocalName.getDescription(course)}</Text>
            <Text normalWeight default><b>{lan.sections}:</b> {course.sections.length}</Text>
        </FlexBlock>
    );
};

export default PostCourseInfo;