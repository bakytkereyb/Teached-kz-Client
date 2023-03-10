import React from 'react';
import Student from "./Student";
import cl from "./CourseStudents.module.css"

const CourseStudents = ({students}) => {

    return (
        <div className={cl.content}>
            {students.map(student => (
                <Student
                    key={student.id}
                    student={student}/>
            ))}
        </div>
    );
};

export default CourseStudents;