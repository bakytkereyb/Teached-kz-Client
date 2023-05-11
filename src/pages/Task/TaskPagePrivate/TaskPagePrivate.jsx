import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clrs} from '../../../constants/colors';
import HeaderPlatform from '../../../components/HeaderPlatform/HeaderPlatform';
import Block from '../../../components/UI/Block/Block';
import Card from '../../../components/LoadingComponents/Card';
import BigText from '../../../components/UI/BigText/BigText';
import {lan} from '../../../constants/lan';
import {useNavigate, useParams} from 'react-router-dom';
import {getTask} from '../../../store/slices/taskSlice';
import FlexBlock from '../../../components/UI/FlexBlock/FlexBlock';
import Text from '../../../components/UI/Text/Text';
import {getCourseById} from '../../../store/slices/course/courseSlice';
import HorizontalDivider from '../../../components/UI/Divider/HorizontalDivider';
import Button from '../../../components/UI/Button/Button';
import {changeCurrentPage} from "../../../store/slices/tableController/CourseStudentsViewController";
import {getAllCourseStudents} from "../../../store/slices/courseStudentsSlice";
import TableWithPagination from "../../../components/TableWithPagination/TableWithPagination";
import {getTaskFiles} from "../../../store/slices/taskFilesSlice";
import FormBlock from "../../../components/Form/FormBlock";
import FormInput from "../../../components/Form/FormInput";
import SectionFile from "../../Course/CourseSection/SectionFile";

const TaskPagePrivate = () => {
    const data = useSelector(state => state.courseStudents)
    const {currentPage, pageSize} = useSelector(state => state.courseStudentsViewController);
    const {task, isLoading, error} = useSelector(state => state.task);
    const {course} = useSelector(state => state.course);
    const taskFile = useSelector(state => state.taskFiles.taskFile)
    const [grade, setGrade] = useState(0)
    const [comment, setComment] = useState('')
    console.log(taskFile)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {id} = useParams();
    const {sectionId} = useParams();
    const {taskId} = useParams();

    const [selectedStudent, setSelectedStudent] = useState(null)

    useEffect(() => {
        dispatch(getCourseById({id: id}));
        dispatch(getTask({courseId: id, sectionId, taskId}))
        dispatch(changeCurrentPage({page: 1, limit: 5}));
        dispatch(getAllCourseStudents({page: 1, limit: 5, id: id}));
    }, [navigate])

    useEffect(() => {
        if (selectedStudent) {
            dispatch(getTaskFiles({studentId: selectedStudent.id, taskId}))
        }
    }, [selectedStudent])

    useEffect(() => {
        console.log(task);
    }, [task])

    const fetchData = async (params) => {
        return dispatch(getAllCourseStudents({...params, id}));
    };

    const saveCurrentPageSettings = (page, pageSize) => {
        dispatch(changeCurrentPage({page: page, pageSize: pageSize}));
    };

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

    if (task === null) {
        return (
            <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
                <HeaderPlatform/>
                <Block style={{marginTop: "50px"}}>
                    <BigText>{lan.taskNotFound}</BigText>
                </Block>
            </div>
        );
    }

    const columns = [
        {
            title: lan.fullName + ` (${lan.username})`,
            render: (_, record) => <Text normalWeight>{record.fullName} <b>({record.username})</b></Text>,
        },
        {
            title: lan.actions,
            render: (_, record) => (
                <FlexBlock>
                    <Text onClick={() => {
                        setSelectedStudent(record);
                    }} type={"button"}>{lan.submission}</Text>
                </FlexBlock>
            ),
            width: '15%'
        },
    ];

    async function handleOnSubmit(e) {
        alert("Hi")
    }

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
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
                        navigate(`/course/${id}/view`)
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
                    <Text default>{lan.students}</Text>
                    <TableWithPagination
                        isLoading={data?.isLoading}
                        dataSource={data?.students}
                        columns={columns}
                        fetchData={fetchData}
                        saveCurrentPage={saveCurrentPageSettings}
                        initialPage={currentPage}
                        initialPageSize={pageSize}
                        hasMore={data?.hasMore}
                    />
                </FlexBlock>
                <FlexBlock style={{
                    backgroundColor: clrs.white,
                    borderRadius: "15px",
                    width: "calc(100% - 60px)",
                    padding: "30px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                }}>
                    {selectedStudent &&
                        (
                            <>
                                <Text normalWeight default><b>{lan.selectedStudent}:</b> {selectedStudent?.fullName}
                                </Text>
                                <Text normalWeight default><b>{lan.submittedFiles}:</b></Text>
                                {/*{taskFile?.files?.map(item => (*/}
                                <SectionFile file={{fileName: '123.docx', label: 'Dias Utebayev'}}/>
                                <SectionFile file={{fileName: '123.docx', label: 'Batyrbek Mal'}}/>
                                {/*))}*/}
                                <FormBlock onSubmit={handleOnSubmit}>
                                    <FormInput
                                        labelText={lan.grade}
                                        id={"grade"}
                                        type={"number"}
                                        min={0}
                                        max={100}
                                        required={true}
                                        maxWidth={"100%"}
                                        value={grade}
                                        onChange={setGrade}
                                    />
                                    <FormInput
                                        labelText={lan.comment}
                                        id={"comment"}
                                        type={"text"}
                                        required={false}
                                        maxWidth={"100%"}
                                        value={comment}
                                        onChange={setComment}
                                    />
                                    <Button>{lan.grade}</Button>
                                </FormBlock>
                            </>

                        )
                    }

                </FlexBlock>
            </Block>
        </div>
    );
};

export default TaskPagePrivate;