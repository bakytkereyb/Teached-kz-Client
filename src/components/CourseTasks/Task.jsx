import React, {useState} from 'react';
import cl from "./CourseTasks.module.css";
import Text from "../UI/Text/Text";
import taskDoneIcon from "../../images/taskDone.svg"
import taskIcon from "../../images/task.svg"


const Task = ({task, index}) => {

    const [taskIsDone, setTaskIsDone] = useState(false)

    const setTaskDone = () => {
        setTaskIsDone(true)
        task.complete = taskIsDone;
    }

    return (
        task.complete ?
            <div className={cl.task}>
                <div style={{display: "flex", gap: '5px', alignItems: "center"}}>
                    <Text style={{color: 'gray'}}>{index}</Text>
                    <Text>
                        <del style={{color: 'gray'}}>{task.name}</del>
                    </Text>
                </div>
                <img src={taskDoneIcon} alt=""/>
            </div>
            :
            <div className={cl.task}>
                <div style={{display: "flex", gap: '5px', alignItems: "center"}}>
                    <Text>{index}</Text>
                    <Text>{task.name}</Text>
                </div>
                <img onClick={setTaskDone} style={{cursor: "pointer"}} src={taskIcon} alt=""/>
            </div>

    );
};

export default Task;