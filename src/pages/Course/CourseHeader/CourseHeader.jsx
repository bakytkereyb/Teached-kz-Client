import React from 'react';
import teacher from "../../../images/tm1.png";
import Text from "../../../components/UI/Text/Text";
import cl from "./CourseHeader.module.css"
import {useSelector} from "react-redux";
import {lan} from '../../../constants/lan';
import {API_BASE_URL} from "../../../constants/api";

const CourseHeader = () => {

    const {course, isLoading} = useSelector(state => state.course);
    const {user} = useSelector(state => state.user);

    function getPercentage(num, max) {
        return ((num / max) * 100).toFixed(2);
    }

    return (
        <div className={cl.courseHeader}>
            <div className={cl.image}>
                <img src={`${API_BASE_URL}/api/file/get/${course.trainer?.imageFileName}`} alt="avatar"/>
            </div>
            <div className={cl.courseHeaderTextDiv}>
                <Text style={{fontWeight: 400, fontSize: '1rem'}}>{lan.trainer}</Text>
                <Text style={{
                    fontWeight: 600,
                    fontSize: '1.2rem',
                    textTransform: 'capitalize'
                }}>{course.trainer.fullName}</Text>
            </div>
            <div className={cl.courseHeaderTextDiv}>
                <Text style={{fontWeight: 400, fontSize: '1rem'}}>{lan.sections}</Text>
                <Text style={{fontWeight: 600, fontSize: '1.2rem'}}>{course.sections.length}</Text>
            </div>
            {
                !user.admin && !user.trainer &&
                <div className={cl.courseHeaderTextDiv}>
                    <Text style={{fontWeight: 400, fontSize: '1rem'}}>{lan.progress}</Text>
                    <Text style={{fontWeight: 600, fontSize: '1.2rem'}}>{getPercentage(course.progress, course.maxProgress)} %</Text>
                </div>
            }

        </div>
    );
};

export default CourseHeader;