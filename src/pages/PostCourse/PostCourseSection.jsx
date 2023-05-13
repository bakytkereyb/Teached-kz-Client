import React from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import FlexBlock from '../../components/UI/FlexBlock/FlexBlock';
import {clrs} from '../../constants/colors';
import Text from '../../components/UI/Text/Text';
import SectionFile from '../Course/CourseSection/SectionFile';

const PostCourseSection = ({section}) => {
    const dispatch = useDispatch();

    const {id} = useParams();

    if (section === null) {
        return '';
    }

    return (
        <FlexBlock style={{
            border: `1px solid ${clrs.whiter2}`,
            borderRadius: "10px",
            flexDirection: "column",
            gap: "0px",
            overflow: "hidden",
        }}>
            <FlexBlock style={{
                backgroundColor: clrs.skin,
                flexWrap: "wrap",
                padding: "15px",
                width: "calc(100% - 30px)",
                justifyContent: "flex-start"
            }}>
                <Text default>{section.name}</Text>
            </FlexBlock>
            {
                section?.files?.map((file,i) => {
                    return (
                        <SectionFile key={file.id} file={file} section={section}/>
                    )
                })
            }
        </FlexBlock>
    );
};

export default PostCourseSection;