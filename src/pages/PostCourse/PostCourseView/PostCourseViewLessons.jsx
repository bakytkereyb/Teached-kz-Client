import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import FlexBlock from '../../../components/UI/FlexBlock/FlexBlock';
import {clrs} from '../../../constants/colors';
import Button from '../../../components/UI/Button/Button';
import {lan} from '../../../constants/lan';
import CourseViewAddLessonModal from '../../Course/CourseView/CourseViewAddLessonModal';
import CourseViewAddFileLessonModal from '../../Course/CourseView/CourseViewAddFileLessonModal';
import CourseViewSection from '../../Course/CourseView/CourseViewSection';
import PostCourseViewAddLessonModal from './PostCourseViewAddLessonModal';
import PostCourseViewAddFileLessonModal from './PostCourseViewAddFileLessonModal';
import PostCourseViewSection from './PostCourseViewSection';

const PostCourseViewLessons = () => {
    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)

    const {course, isLoading} = useSelector(state => state.postCourse);

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
            <PostCourseViewAddLessonModal setModal={setModal} modal={modal}/>
            <PostCourseViewAddFileLessonModal selectedSection={selectedSection} setModal={setModal2} modal={modal2}/>

            {
                course?.sections.map((section, i) => {
                    return (
                        <PostCourseViewSection setSelectedSection={setSelectedSection} key={section.id} section={section} setModal2={setModal2}/>
                    )
                })
            }

        </FlexBlock>
    );
};

export default PostCourseViewLessons;