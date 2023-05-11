import React, {useEffect} from 'react';
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

const TaskPagePrivate = () => {
    const {task, isLoading, error} = useSelector(state => state.task);
    const {course} = useSelector(state => state.course);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {id} = useParams();
    const {sectionId} = useParams();
    const {taskId} = useParams();

    useEffect(() => {
        dispatch(getCourseById({id: id}));
        dispatch(getTask({ courseId: id, sectionId, taskId }))
    }, [navigate])

    useEffect(() => {
        console.log(task);
    }, [task])

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

                </FlexBlock>
            </Block>
        </div>
    );
};

export default TaskPagePrivate;