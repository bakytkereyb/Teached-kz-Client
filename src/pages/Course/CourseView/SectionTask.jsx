import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {getCourseById, removeFileToSection, removeTaskToSection} from '../../../store/slices/course/courseSlice';
import FlexBlock from '../../../components/UI/FlexBlock/FlexBlock';
import Icon from '../../../components/UI/Icon/Icon';
import fileIcon from '../../../images/paper-file-text.svg';
import taskIcon from '../../../images/tasks.svg';
import Text from '../../../components/UI/Text/Text';
import {API_BASE_URL} from '../../../constants/api';
import trash from '../../../images/trash.svg';

const SectionTask = ({task, section}) => {
    const dispatch = useDispatch();

    const {id} = useParams();

    const navigate = useNavigate();

    async function handleDeleteTask() {
        await dispatch(removeTaskToSection({sectionId: section.id, taskId: task.id}));
        await dispatch(getCourseById({id: id}));
    }

    return (
        <FlexBlock style={{
            flexWrap: "wrap",
            padding: "15px 30px",
            width: "calc(100% - 60px)",
            justifyContent: "flex-start"
        }}>
            <Icon src={taskIcon}/>
            <Text onClick={() => {
                navigate(`/course/${id}/section/${section.id}/task/${task.id}/private`)
            }} default normalWeight style={{cursor: "pointer"}}>{task?.name}</Text>

            <Icon onClick={handleDeleteTask} style={{cursor: "pointer"}} src={trash}/>
        </FlexBlock>
    );
};

export default SectionTask;