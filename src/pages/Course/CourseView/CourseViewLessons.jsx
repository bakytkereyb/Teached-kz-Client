import React, {useState} from 'react';
import {clrs} from "../../../constants/colors";
import Button from "../../../components/UI/Button/Button";
import {lan} from "../../../constants/lan";
import CourseViewAddLessonModal from "./CourseViewAddLessonModal";
import FlexBlock from "../../../components/UI/FlexBlock/FlexBlock";
import Text from "../../../components/UI/Text/Text";
import Icon from "../../../components/UI/Icon/Icon";
import file from '../../../images/paper-file-text.svg';
import fileAdd from '../../../images/file-add.svg';
import CourseViewAddFileLessonModal from "./CourseViewAddFileLessonModal";
import {useSelector} from "react-redux";
import CourseViewSection from "./CourseViewSection";

const CourseViewLessons = () => {

    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)

    const {course, isLoading} = useSelector(state => state.course);

    const [selectedSection, setSelectedSection] = useState(null);

    if (course === null) {
        return '';
    }

    return (
        <FlexBlock style={{
            backgroundColor: clrs.white,
            borderRadius: "15px",
            width: "calc(100% - 60px)",
            padding: "30px",
            flexDirection: "column",
            alignItems: "flex-start",
        }}>
            <Button onClick={() => {setModal(true)}} type={2}>{lan.addSection}</Button>
            <CourseViewAddLessonModal setModal={setModal} modal={modal}/>
            <CourseViewAddFileLessonModal selectedSection={selectedSection} setModal={setModal2} modal={modal2}/>

            {
                course?.sections.map((section, i) => {
                    return (
                        <CourseViewSection setSelectedSection={setSelectedSection} key={section.id} section={section} setModal2={setModal2}/>
                    )
                })
            }

            <CourseViewSection isCertificate={true} setSelectedSection={setSelectedSection} key={course.certificateSection.id} section={course.certificateSection} setModal2={setModal2}/>

        </FlexBlock>
    );
};

export default CourseViewLessons;