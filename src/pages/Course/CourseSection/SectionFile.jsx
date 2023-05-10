import React from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getCourseById, removeFileToSection} from '../../../store/slices/course/courseSlice';
import FlexBlock from '../../../components/UI/FlexBlock/FlexBlock';
import Icon from '../../../components/UI/Icon/Icon';
import fileIcon from '../../../images/paper-file-text.svg';
import Text from '../../../components/UI/Text/Text';
import {API_BASE_URL} from '../../../constants/api';
import trash from '../../../images/trash.svg';

const SectionFile = ({file}) => {

    return (
        <FlexBlock style={{
            flexWrap: "wrap",
            padding: "15px 30px",
            width: "calc(100% - 60px)",
            justifyContent: "flex-start"
        }}>
            <Icon src={fileIcon}/>
            <Text onClick={() => {window.open(`${API_BASE_URL}/api/file/get/${file.fileName}`, "_blank")}} default normalWeight style={{cursor: "pointer"}}>{file.label}</Text>
        </FlexBlock>
    );
};

export default SectionFile;