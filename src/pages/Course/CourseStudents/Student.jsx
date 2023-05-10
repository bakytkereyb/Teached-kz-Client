import React from 'react';
import cl from "./CourseStudents.module.css"
import user from "../../../images/user.svg"
import naruto from "../../../images/naruto.jpg"
import Text from "../../../components/UI/Text/Text";
const Student = ({student}) => {
    return (
        <div className={cl.student}>
            {student.image ? <img src={naruto} alt=" "/> : <img src={user} alt=" "/>}
            <Text>{student.name} {student.surname}</Text>
        </div>
    );
};

export default Student;