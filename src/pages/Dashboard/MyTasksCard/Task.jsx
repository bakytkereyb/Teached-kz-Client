import React, {useState} from 'react';
import cl from './MyTasks.module.css'
import Text from "../../../components/UI/Text/Text";
import {useNavigate} from "react-router-dom";

const Task = ({task, index}) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className={cl.card__content}>
            <div style={{
                display: "flex",
                flexDirection: 'row',
                gap: '6px',
                cursor: 'pointer',
                textDecoration: isHovered ? "underline" : "none"
            }}
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}
                 onClick={() => navigate(`/course/${task.course.id}/section/${task.section.id}/task/${task.task.id}`)}
            >
                <Text>{index + 1}.</Text>
                <Text>{task.task.name}</Text>
            </div>
        </div>
    );
};

export default Task;