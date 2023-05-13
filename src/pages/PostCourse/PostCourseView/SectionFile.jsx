import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import FlexBlock from '../../../components/UI/FlexBlock/FlexBlock';
import Icon from '../../../components/UI/Icon/Icon';
import fileIcon from '../../../images/paper-file-text.svg';
import Text from '../../../components/UI/Text/Text';
import {API_BASE_URL} from '../../../constants/api';
import trash from '../../../images/trash.svg';
import React from 'react';
import {getPostCourseById, removeFileToSectionPostCourse} from '../../../store/slices/postCourse/postCourseSlice';

const SectionFile = ({file, section}) => {

    const dispatch = useDispatch();

    const {id} = useParams();

    async function handleDeleteFile() {
        await dispatch(removeFileToSectionPostCourse({sectionId: section.id, fileId: file.id}));
        await dispatch(getPostCourseById({id: id}));
    }

    return (
        <FlexBlock style={{
            flexWrap: "wrap",
            padding: "15px 30px",
            width: "calc(100% - 60px)",
            justifyContent: "flex-start"
        }}>
            <Icon src={fileIcon}/>
            <Text onClick={() => {window.open(`${API_BASE_URL}/api/file/get/${file.fileName}`, "_blank")}} default normalWeight style={{cursor: "pointer"}}>{file.label}</Text>

            <Icon onClick={handleDeleteFile} style={{cursor: "pointer"}} src={trash}/>
        </FlexBlock>
    );
};

export default SectionFile;