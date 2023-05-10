import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clrs} from '../../../constants/colors';
import Button from '../../../components/UI/Button/Button';
import {lan} from '../../../constants/lan';
import FlexBlock from '../../../components/UI/FlexBlock/FlexBlock';
import {Badge, Table} from 'antd';
import Text from '../../../components/UI/Text/Text';
import {LocalName} from '../../../utils/LocalName';
import AddTaskModal from './AddTaskModal';
import {getCourseById, removeTaskToSection} from '../../../store/slices/course/courseSlice';
import {useParams} from 'react-router-dom';

const CourseViewTasks = () => {
    const [modal, setModal] = useState(false)
    const {course, isLoading} = useSelector(state => state.course);

    const [tasks, setTasks] = useState([]);

    const {id} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        if (course !== null) {
            const arr = [];
            course.sections.forEach(section => {
                section.tasks.forEach(task => {
                    arr.push(task)
                })
            })
            setTasks(arr);
        }
    }, [course])

    function findSection(task) {
        let section = null;
        course.sections.forEach((courseSection) => {
            if (courseSection.tasks.find(sectionTask => sectionTask.id === task.id)) {
                section = courseSection
            }
        })
        return section;
    }

    async function handleDeleteTask(task) {
        const taskSection = findSection(task);
        await dispatch(removeTaskToSection({sectionId: taskSection.id, taskId: task.id}));
        await dispatch(getCourseById({id: id}));
    }

    if (course === null) {
        return '';
    }

    const columns = [
        {
            title: lan.task,
            render: (_, record) => <Text>{record.name}</Text>,
        },
        {
            title: lan.section,
            render: (_, record) => <Text>{findSection(record)?.name}</Text>,
            width: '15%',
        },
        {
            title: lan.deadline,
            render: (_, record) => <Text>{new Date(record.deadline).toLocaleString()}</Text>,
            width: '15%',
        },
        {
            title: lan.actions,
            render: (_, record) => (
                <FlexBlock>
                    <Text type={"button"}>{lan.view}</Text>
                    <Text type={"button-black"} onClick={() => {handleDeleteTask(record)}}>{lan.delete}</Text>
                </FlexBlock>
            ),
            width: '20%',
        },
    ];

    return (
        <FlexBlock style={{
            backgroundColor: clrs.white,
            borderRadius: "15px",
            width: "calc(100% - 60px)",
            padding: "30px",
            flexDirection: "column",
            alignItems: "flex-start",
        }}>
            <Button onClick={() => {setModal(true)}} type={2}>{lan.addTask}</Button>
            <AddTaskModal modal={modal} setModal={setModal}/>
            <Table
                expandable={{
                    expandedRowRender: (record) => <Text normalWeight>{record.description}</Text>,
                }}
                style={{width: "100%"}}
                columns={columns}
                dataSource={tasks}
                bordered
                rowKey={record => record.id}
            />
        </FlexBlock>
    );
};

export default CourseViewTasks;