import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {getCourseById} from '../../store/slices/course/courseSlice';
import {getTask} from '../../store/slices/taskSlice';
import {changeCurrentPage} from '../../store/slices/tableController/CourseStudentsViewController';
import {getAllCourseStudents} from '../../store/slices/courseStudentsSlice';
import {getTaskFiles} from '../../store/slices/taskFilesSlice';
import {clrs} from '../../constants/colors';
import HeaderPlatform from '../../components/HeaderPlatform/HeaderPlatform';
import Block from '../../components/UI/Block/Block';
import Card from '../../components/LoadingComponents/Card';
import BigText from '../../components/UI/BigText/BigText';
import {lan} from '../../constants/lan';
import Text from '../../components/UI/Text/Text';
import FlexBlock from '../../components/UI/FlexBlock/FlexBlock';
import Button from '../../components/UI/Button/Button';
import HorizontalDivider from '../../components/UI/Divider/HorizontalDivider';
import TableWithPagination from '../../components/TableWithPagination/TableWithPagination';
import SectionFile from '../Course/CourseSection/SectionFile';
import FormBlock from '../../components/Form/FormBlock';
import FormInput from '../../components/Form/FormInput';
import BlockLoading from '../../components/LoadingComponents/BlockLoading';
import FileUploaderService from '../../services/FileUploaderService';
import TaskFilesService from '../../services/TaskFilesService';
import {NotificationManager} from 'react-notifications';

const TaskPage = () => {
    const {task, isLoading, error} = useSelector(state => state.task);
    const {course} = useSelector(state => state.course);
    const taskFile = useSelector(state => state.taskFiles.taskFile)
    const {user} = useSelector(state => state.user);
    const [files, setFiles] = useState([]);

    const [submitFilesLoading, setSubmitFilesLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {id} = useParams();
    const {sectionId} = useParams();
    const {taskId} = useParams();

    useEffect(() => {
        dispatch(getCourseById({id: id}));
        dispatch(getTask({courseId: id, sectionId, taskId}));
        dispatch(getTaskFiles({studentId: user.id, taskId}));
    }, [navigate])

    useEffect(() => {
        console.log(task);
        console.log(taskFile);
    }, [task, taskFile])

    function getStatusString(status) {
        if (status === 'NOT_SUBMITTED') {
            return lan.notSubmitted
        }
        if (status === 'SUBMITTED') {
            return lan.submitted;
        }
        return lan.graded
    }

    function findSection(task) {
        let section = null;
        course.sections.forEach((courseSection) => {
            if (courseSection.tasks.find(sectionTask => sectionTask.id === task.id)) {
                section = courseSection
            }
        })
        return section;
    }

    async function handleOnSubmit(e) {
        e.preventDefault();
        try {
            setSubmitFilesLoading(true);
            const fileNames = [];
            for (const submittedFile of files) {
                await FileUploaderService.uploadFile(submittedFile)
                    .then((r) => {
                        const fileName = r.data;
                        fileNames.push(fileName);
                    });
            }
            await TaskFilesService.submitFiles(id, sectionId, taskId, fileNames)
                .finally(async () => {
                    setSubmitFilesLoading(false);
                    await dispatch(getCourseById({id: id}));
                    await dispatch(getTask({courseId: id, sectionId, taskId}));
                    await dispatch(getTaskFiles({studentId: user.id, taskId}));
                    NotificationManager.success(lan.submitted);
                });
        } catch (e) {
            setSubmitFilesLoading(false);
            NotificationManager.error(lan.error);
        }

    }

    if (isLoading) {
        return (
            <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
                <HeaderPlatform/>
                <Block style={{marginTop: "50px"}}>
                    <Card type={"horizontal-small"}/>
                    <Card type={"horizontal"}/>
                    <Card type={"horizontal-big"}/>
                </Block>
            </div>
        );
    }

    if (task === null || course === null || taskFile === null) {
        return (
            <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
                <HeaderPlatform/>
                <Block style={{marginTop: "50px"}}>
                    <BigText>{lan.taskNotFound}</BigText>
                </Block>
            </div>
        );
    }

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <BlockLoading isLoading={submitFilesLoading}/>
            <Block style={{marginTop: "50px"}}>
                <FlexBlock style={{
                    backgroundColor: clrs.white,
                    borderRadius: "15px",
                    width: "calc(100% - 60px)",
                    padding: "30px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                }}>
                    <Button type={2} onClick={() => {
                        navigate(`/course/${id}`)
                    }}>{lan.back}</Button>
                    <Text default normalWeight><b>{lan.course}:</b> {course.name}</Text>
                    <HorizontalDivider/>
                    <Text default normalWeight><b>{lan.taskName}:</b> {task.name}</Text>
                    <Text default normalWeight><b>{lan.description}:</b> {task.description}</Text>
                    <Text default normalWeight><b>{lan.deadline}:</b> {new Date(task.deadline).toLocaleString()}</Text>
                </FlexBlock>
                <FlexBlock style={{
                    backgroundColor: clrs.white,
                    borderRadius: "15px",
                    width: "calc(100% - 60px)",
                    padding: "30px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                }}>
                    <Text default normalWeight><b>{lan.grade}:</b> {taskFile.grade}</Text>
                    <Text default normalWeight><b>{lan.comment}:</b> {taskFile.comment}</Text>
                    <Text default normalWeight><b>{lan.status}:</b> {getStatusString(taskFile.status)}</Text>

                    <Text normalWeight default><b>{lan.submittedFiles}:</b></Text>
                    <FlexBlock style={{
                        backgroundColor: clrs.whiter,
                        borderRadius: "15px",
                        padding: "15px 0",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "0px"
                    }}>
                        {
                            taskFile.files.map((file) => {
                                return <SectionFile file={file}/>
                            })
                        }
                    </FlexBlock>

                    {
                        task.editable && taskFile.status !== 'GRADED' &&
                        <FlexBlock style={{
                            backgroundColor: clrs.whiter,
                            borderRadius: "15px",
                            width: "calc(100% - 30px)",
                            padding: "15px",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "0px"
                        }}>
                            <FormBlock onSubmit={handleOnSubmit}>
                                <FormInput
                                    labelText={lan.files}
                                    id={"file"}
                                    type={"file"}
                                    required={true}
                                    maxWidth={"100%"}
                                    onChange={setFiles}
                                    multiple={true}
                                />
                                <Button>{lan.submit}</Button>
                            </FormBlock>
                        </FlexBlock>
                    }

                </FlexBlock>
            </Block>
        </div>
    );
};

export default TaskPage;