import React from 'react';
import Text from "../../../../components/UI/Text/Text";
import Block from "../../../../components/UI/Block/Block";
import {useSelector} from "react-redux";

const AdminCourseList = () => {
    const courses = useSelector(state => state.adminCourse.courses)

    return (
        <Block style={{padding: 0, gap: "20px"}}>
            {courses?.map((course, index) => (
                <Text key={index} default>{index + 1} {course.name}</Text>
            ))}
        </Block>
    );
};

export default AdminCourseList;