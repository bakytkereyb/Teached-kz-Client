import React, {useEffect} from 'react';
import {clrs} from "../../constants/colors";
import HeaderPlatform from "../../components/HeaderPlatform/HeaderPlatform";
import Block from "../../components/UI/Block/Block";
import Text from "../../components/UI/Text/Text";
import {lan} from "../../constants/lan";
import FlexBlock from "../../components/UI/FlexBlock/FlexBlock";
import {Badge, Table} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import Card from "../../components/LoadingComponents/Card";
import {useNavigate} from "react-router-dom";
import {getAllTasks} from "../../store/slices/tasksSlice";

const Tasks = () => {

    const {tasks, isLoading, error} = useSelector(state => state.tasks)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(tasks)

    const CustomTaskBadge = (status) => {
        if (status === 'NOT_SUBMITTED') {
            return <Badge text={lan.notSubmitted} status={'error'}/>
        }
        if (status === 'SUBMITTED') {
            return <Badge text={lan.submitted} status={'warning'}/>
        }
        return <Badge text={lan.graded} status={'success'}/>
    }


    useEffect(() => {
        dispatch(getAllTasks());
    }, [navigate])
    const columns = [
        {
            title: lan.taskName,
            render: (_, record) => <Text>{record.task.name}</Text>,
        },
        {
            title: lan.deadline,
            render: (_, record) => <Text>{new Date(record.task.deadline).toLocaleString()}</Text>,
            width: '15%',
        },
        {
            title: lan.status,
            render: (_, record) => (
                CustomTaskBadge(record.task.taskFiles.status)
            ),
            width: '15%',
        },
        {
            title: lan.grade,
            render: (_, record) => <Text>{record.task.taskFiles.grade}</Text>,
            width: '10%',
        },
        {
            title: lan.actions,
            render: (_, record) => (
                <FlexBlock>
                    <Text onClick={() => navigate(`/course/${record.course.id}/section/${record.section.id}/task/${record.task.id}`)} type={"button"}>{lan.view}</Text>
                </FlexBlock>
            ),
            width: '10%',
        },
    ];


    if (isLoading) {
        return (
            <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
                <HeaderPlatform/>
                <Block style={{marginTop: "50px", alignItems: "flex-start"}}>
                    <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.trainingCourses}</Text>
                    <Card type={"horizontal"}/>
                </Block>
            </div>
        );
    }

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px", alignItems: "flex-start"}}>
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.tasks}</Text>
                <FlexBlock style={{
                    backgroundColor: clrs.white,
                    borderRadius: "15px",
                    padding: "20px",
                    width: "calc(100% - 40px)",
                }}>
                    <Table
                        expandable={{
                            expandedRowRender: (record) => <Text
                                normalWeight>{record.task.description}</Text>,
                        }}
                        style={{width: "100%"}}
                        columns={columns}
                        dataSource={tasks}
                        bordered
                        rowKey={record => record.task.id}
                    />
                </FlexBlock>
            </Block>
        </div>
    );
};

export default Tasks;