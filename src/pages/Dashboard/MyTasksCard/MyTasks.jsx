import React from 'react';
import cl from './MyTasks.module.css'
import Text from "../../../components/UI/Text/Text";
import arrowRight from "../../../images/arrow-circle-right.svg"
import Task from "./Task";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {lan} from "../../../constants/lan";

const MyTasks = () => {

    const {tasks, isLoading, error} = useSelector(state => state.tasks)
    const sortedTasks = [...tasks].sort((a, b) => new Date(a.task.deadline) - new Date(b.task.deadline));
    const filteredTasks = sortedTasks.slice(0, 4);
    const navigate = useNavigate();

    return (
        <div className={cl.card}>
            <div className={cl.card__header}>
                <div style={{display: "flex", flexDirection: 'row', gap: '6px'}}>
                    <Text style={{fontWeight: '800'}}>{lan.myTasks}</Text>
                    <Text style={{color: '#65676D'}}>({filteredTasks.length})</Text>
                </div>
                <img style={{cursor: 'pointer'}} src={arrowRight} onClick={() => navigate("/tasks")} alt={lan.tasks}/>
            </div>
            <br/>
            {filteredTasks.map((item,index) => {
               return <Task task={item} index={index} key={item.task.id}/>
            })}
        </div>
    );
};

export default MyTasks;