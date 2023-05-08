import React from 'react';
import cl from "./Course.module.css"
import Text from "../UI/Text/Text";
import arrowRight from "../../images/arrow-circle-right.svg"
import {lan} from "../../constants/lan";

const Course = ({taskDone, taskTotal, pre}) => {

    if(pre) {
        return (
            <div className={cl.card}>
                <div className={cl.top__card}>
                    <Text>Course 1</Text>
                    <img src={arrowRight} alt=""/>
                </div>
                <br/>
            </div>
        );
    }

    return (
        <div className={cl.card}>
            <div className={cl.top__card}>
                <Text>Course 1</Text>
                <img src={arrowRight} alt=""/>
            </div>
            <br/>
            <Text>{lan.taskDone} : 25/50</Text>
            <progress className={cl.progressBar} value={25} max={50}/>
        </div>
    );
};

export default Course;