import React from 'react';
import naruto from "../../images/naruto.jpg";
import Text from "../UI/Text/Text";
import cl from "./CourseHeader.module.css"
import {getUserByToken} from "../../services/UserService";
import {useSelector} from "react-redux";

const CourseHeader = () => {

    const user = useSelector(state => state.user.user);

    return (
        <div className={cl.courseHeader}>
            <img src={naruto} alt="avatar" />
            <div className={cl.courseHeaderTextDiv}>
                <Text style={{fontWeight: 400, fontSize: '1rem'}}>Trainer</Text>
                <Text style={{fontWeight: 600, fontSize: '1.2rem'}}>{user.firstName} {user.secondName}</Text>
            </div>
            <div className={cl.courseHeaderTextDiv}>
                <Text style={{fontWeight: 400, fontSize: '1rem'}}>Lessons</Text>
                <Text style={{fontWeight: 600, fontSize: '1.2rem'}}>69</Text>
            </div>
        </div>
    );
};

export default CourseHeader;