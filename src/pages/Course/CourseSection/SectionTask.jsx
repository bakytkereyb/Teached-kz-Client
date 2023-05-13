import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import FlexBlock from '../../../components/UI/FlexBlock/FlexBlock';
import Icon from '../../../components/UI/Icon/Icon';
import taskIcon from '../../../images/tasks.svg';
import Text from '../../../components/UI/Text/Text';
import React from 'react';

const SectionTask = ({task, section}) => {
    const dispatch = useDispatch();

    const {id} = useParams();

    const navigate = useNavigate();

    return (
        <FlexBlock style={{
            flexWrap: "wrap",
            padding: "15px 30px",
            width: "calc(100% - 60px)",
            justifyContent: "flex-start"
        }}>
            <Icon src={taskIcon}/>
            <Text onClick={() => {
                navigate(`/course/${id}/section/${section.id}/task/${task.id}`)
            }} default normalWeight style={{cursor: "pointer"}}>{task?.name}</Text>

        </FlexBlock>
    );
};

export default SectionTask;