import React from 'react';
import cl from './MyTasks.module.css'
import Text from "../../../components/UI/Text/Text";
import task from "../../../images/task.svg";

const Task = () => {
    return (
        <div className={cl.card__content}>
            <div style={{display: "flex", flexDirection: 'row', gap: '6px'}}>
                <Text>01</Text>
                <Text>Create Wireframe</Text>
            </div>
            <img src={task} alt="Go"/>
        </div>
    );
};

export default Task;