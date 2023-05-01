import React from 'react';
import cl from './MyTasks.module.css'
import Text from "../UI/Text/Text";
import arrowRight from "../../images/arrow-circle-right.svg"
import Task from "./Task";

const MyTasks = () => {
    return (
        <div className={cl.card}>
            <div className={cl.card__header}>
                <div style={{display: "flex", flexDirection: 'row', gap: '6px'}}>
                    <Text style={{fontWeight: '800'}}>My Tasks</Text>
                    <Text style={{color: '#65676D'}}>(04)</Text>
                </div>
                <img src={arrowRight} alt="Go"/>
            </div>
            <br/>
           <Task/>
           <Task/>
           <Task/>
           <Task/>
        </div>
    );
};

export default MyTasks;