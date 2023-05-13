import React from 'react';
import FlexBlock from '../../../components/UI/FlexBlock/FlexBlock';
import {clrs} from '../../../constants/colors';
import Button from '../../../components/UI/Button/Button';
import {lan} from '../../../constants/lan';

const PostCourseTabBtns = ({setTabNum, tabNum}) => {
    return (
        <FlexBlock style={{
            backgroundColor: clrs.white,
            borderRadius: "15px",
            width: "calc(100% - 60px)",
            padding: "30px",
            flexWrap: "wrap",
            justifyContent: "flex-start"
        }}>
            <Button onClick={() => {setTabNum(1)}} type={tabNum === 1 && 2}>{lan.sections}</Button>
            <Button onClick={() => {setTabNum(2)}} type={tabNum === 2 && 2}>{lan.students}</Button>
        </FlexBlock>
    );
};

export default PostCourseTabBtns;