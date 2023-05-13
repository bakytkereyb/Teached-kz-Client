import React from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import FlexBlock from '../../../components/UI/FlexBlock/FlexBlock';
import {clrs} from '../../../constants/colors';
import Icon from '../../../components/UI/Icon/Icon';
import trash from '../../../images/trash.svg';
import Text from '../../../components/UI/Text/Text';
import {lan} from '../../../constants/lan';
import fileAdd from '../../../images/file-add.svg';
import {removeSectionByIdFromPostCourseById} from '../../../store/slices/postCourse/postCourseSlice';
import SectionFile from './SectionFile';

const PostCourseViewSection = ({section, setModal2, setSelectedSection}) => {
    const dispatch = useDispatch();

    const {id} = useParams();

    async function handleDeleteSection() {
        await dispatch(removeSectionByIdFromPostCourseById({id: id, sectionId: section.id}));
    }

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
                <Icon onClick={handleDeleteSection} style={{cursor: "pointer"}} src={trash}/>
                <Text default>{section.name}</Text>
                <Icon onClick={() => {
                    setModal2(true);
                    setSelectedSection(section);
                }} style={{cursor: "pointer"}} src={fileAdd}/>

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

export default PostCourseViewSection;