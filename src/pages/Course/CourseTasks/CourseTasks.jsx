import React from 'react';
import cl from "./CourseTasks.module.css";
import Task from "./Task";
const CourseTasks = ({tasks}) => {

    return (
        <div className={cl.content}>
            {tasks.map((task,index) => (
                <Task
                    key={task.id}
                    index={index + 1}
                    task={task}/>
            ))}
        </div>
    );
};

export default CourseTasks;