import React from 'react';
import naruto from "../../images/naruto.jpg";
import Text from "../UI/Text/Text";
import cl from "./CourseHeader.module.css"

const CourseHeader = ({user}) => {
    return (
        <div className={cl.courseHeader}>
            <img src={naruto} alt="avatar" />
            <div className={cl.courseHeaderTextDiv}>
                <Text style={{fontWeight: 400, fontSize: '1rem'}}>Trainer</Text>
                <Text style={{fontWeight: 600, fontSize: '1.2rem'}}>Dias Utebayev Uzumaki</Text>
            </div>
            <div className={cl.courseHeaderTextDiv}>
                <Text style={{fontWeight: 400, fontSize: '1rem'}}>Lessons</Text>
                <Text style={{fontWeight: 600, fontSize: '1.2rem'}}>69</Text>
            </div>
        </div>
    );
};

export default CourseHeader;