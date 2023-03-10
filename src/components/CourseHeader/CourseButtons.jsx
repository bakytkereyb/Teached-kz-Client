import React, {useState} from 'react';
import Button from "../UI/Button/Button";
import {lan} from "../../constants/lan";
import cl from "./CourseHeader.module.css"

const CourseButtons = ({index}) => {

    return (
        <div className={cl.courseButtons}>
            <Button onClick={() => index(1)} type={2}>{lan.lessons}</Button>
            <Button onClick={() => index(2)} type={2}>{lan.students}</Button>
            <Button onClick={() => index(3)}type={2}>{lan.tasks}</Button>
            <Button onClick={() => index(4)} type={2}>{lan.posts}</Button>
            <Button onClick={() => index(5)} type={2}>{lan.tests}</Button>
        </div>
    );
};

export default CourseButtons;