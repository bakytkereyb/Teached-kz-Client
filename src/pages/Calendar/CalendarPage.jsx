import React, {useEffect, useState} from 'react';
import {clrs} from "../../constants/colors";
import {Badge, Calendar, Card} from "antd";
import HeaderPlatform from "../../components/HeaderPlatform/HeaderPlatform";
import Block from "../../components/UI/Block/Block";
import style from "./Calendar.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getAllTasks} from "../../store/slices/tasksSlice";

const CustomTaskBadge = (status) => {
    if (status === 'NOT_SUBMITTED') {
        return 'error';
    }
    if (status === 'SUBMITTED') {
        return 'warning'
    }
    return 'success'
}
const getMonthData = (value) => {
    if (value.month() === 8) {
        return 1394;
    }
};
const CalendarPage = () => {

    const {tasks, isLoading, error} = useSelector(state => state.tasks)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTasks());
    }, [navigate])
    const getListData = (value) => {
        const date = value.date();
        const month = value.month();

        const filteredData = tasks.filter(item => {
            const itemDate = new Date(item.task.deadline);
            return itemDate.getDate() === date && itemDate.getMonth() === month;
        });

        const listData = filteredData.map(item => ({
            type: CustomTaskBadge(item.task.taskFiles.status),
            content: item.task.name,
            date: item.task.deadline,
            taskId: item.task.id,
            courseId: item.course.id,
            sectionId: item.section.id
        }));

        return listData;
    };

    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const [isHovered, setIsHovered] = useState(null);
    const handleMouseEnter = (itemContent) => {
        setIsHovered(itemContent);
    };

    const handleMouseLeave = () => {
        setIsHovered(null);
    };

    const dateFullCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className={style.events}>
                {listData.map((item) => (
                    <li key={item.taskId}>
                        <Badge
                            status={item.type}
                            text={item.content}
                            style={{
                                textDecoration: isHovered === item.content ? 'underline' : 'none',
                            }}
                            onMouseEnter={() => handleMouseEnter(item.content)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => navigate(`/course/${item.courseId}/section/${item.sectionId}/task/${item.taskId}`)}
                        />
                    </li>
                ))}
            </ul>
        );
    };
    const cellRender = (current, info) => {
        if (info.type === 'date') return dateFullCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };
    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "10px"}}>
                <Card>
                    <Calendar cellRender={cellRender}/>
                </Card>
            </Block>
        </div>
    );
};

export default CalendarPage;