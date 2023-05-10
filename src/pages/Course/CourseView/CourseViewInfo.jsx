import React from 'react';
import {clrs} from "../../../constants/colors";
import Text from "../../../components/UI/Text/Text";
import {lan} from "../../../constants/lan";
import FlexBlock from "../../../components/UI/FlexBlock/FlexBlock";
import {useSelector} from "react-redux";
import {LocalName} from "../../../utils/LocalName";

const CourseViewInfo = () => {
    const {course, isLoading} = useSelector(state => state.course);

    return (
        <FlexBlock style={{
            backgroundColor: clrs.white,
            borderRadius: "15px",
            width: "calc(100% - 60px)",
            padding: "30px",
            flexDirection: "column",
            alignItems: "flex-start",
        }}>
            <Text normalWeight default><b>{lan.course}:</b> {LocalName.getName(course)}</Text>
            <Text normalWeight default><b>{lan.description}:</b> {LocalName.getDescription(course)}</Text>
        </FlexBlock>
    );
};

export default CourseViewInfo;