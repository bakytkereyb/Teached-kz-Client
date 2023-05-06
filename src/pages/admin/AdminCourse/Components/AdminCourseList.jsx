import React, {useEffect} from 'react';
import Text from "../../../../components/UI/Text/Text";
import Block from "../../../../components/UI/Block/Block";
import {useDispatch, useSelector} from "react-redux";
import {getAllCourses} from "../../../../store/slices/admin/adminCourseSlice";

const AdminCourseList = () => {
    const courses = useSelector(state => state.adminCourse.courses)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCourses());
    }, [courses])

    console.log(courses)
    return (
        <Block style={{padding: 0, gap: "20px"}}>
            {courses?.map((course, index) => (
                <Text key={index} default>{index + 1} {course.name}</Text>
            ))}
        </Block>
    );
};

export default AdminCourseList;