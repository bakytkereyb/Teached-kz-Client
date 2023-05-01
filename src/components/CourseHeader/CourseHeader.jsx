import React from 'react';
import teacher from "../../images/tm1.png";
import Text from "../UI/Text/Text";
import cl from "./CourseHeader.module.css"
import {useSelector} from "react-redux";

const CourseHeader = () => {

    const user = useSelector(state => state.user.user);

    return (
        <div className={cl.courseHeader}>
            <div className={cl.image}>
                <img src={teacher} alt="avatar"/>
            </div>
            <div className={cl.courseHeaderTextDiv}>
                <Text style={{fontWeight: 400, fontSize: '1rem'}}>Trainer</Text>
                <Text style={{
                    fontWeight: 600,
                    fontSize: '1.2rem',
                    textTransform: 'capitalize'
                }}>{user.firstName} {user.secondName} {user.middleName}</Text>
            </div>
            <div className={cl.courseHeaderTextDiv}>
                <Text style={{fontWeight: 400, fontSize: '1rem'}}>Lessons</Text>
                <Text style={{fontWeight: 600, fontSize: '1.2rem'}}>69</Text>
            </div>
        </div>
    );
};

export default CourseHeader;