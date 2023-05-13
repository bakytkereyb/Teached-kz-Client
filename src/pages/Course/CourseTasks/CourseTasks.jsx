import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {lan} from '../../../constants/lan';
import Text from '../../../components/UI/Text/Text';
import FlexBlock from '../../../components/UI/FlexBlock/FlexBlock';
import {clrs} from '../../../constants/colors';
import {Table} from 'antd';
const CourseTasks = () => {

    const {course, isLoading} = useSelector(state => state.course);

    const [tasks, setTasks] = useState([]);

    const {id} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            title: lan.grade,
            render: (_, record) => <Text>{record?.taskFiles?.grade}</Text>,
            width: '10%',
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
                    <Text onClick={() => {
                        navigate(`/course/${id}/section/${findSection(record)?.id}/task/${record.id}`)
                    }} type={"button"}>{lan.view}</Text>
                </FlexBlock>
            ),
            width: '10%',
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

export default CourseTasks;