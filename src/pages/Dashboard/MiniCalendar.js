import React, {useState} from 'react';
import style from "../Calendar/Calendar.module.css";
import {Badge, Calendar, Col, Radio, Row, Select} from "antd";
import arrowRight from "../../images/arrow-circle-right.svg";
import {lan} from "../../constants/lan";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

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
        return null;
    }
};
const MiniCalendar = () => {
    const {tasks, isLoading, error} = useSelector(state => state.tasks)

    const navigate = useNavigate();
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
            date: item.task.deadline
        }));

        return listData;
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
                <li>
                    <Badge
                        status={listData[0]?.type}
                        style={{
                            padding: '8px',
                            textDecoration: isHovered === listData[0]?.content ? 'underline' : 'none',
                        }}
                        onMouseEnter={() => handleMouseEnter(listData[0]?.content)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => navigate("/calendar")}
                    />
                </li>
            </ul>
        );
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

    const cellRender = (current, info) => {
        if (info.type === 'date') return dateFullCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };


    return (
        <Calendar
            style={{minHeight: 468, borderRadius: 20, padding: 10}}
            headerRender={({value, type, onChange, onTypeChange}) => {
                const start = 0;
                const end = 12;
                const monthOptions = [];
                let current = value.clone();
                const localeData = value.localeData();
                const months = [];
                for (let i = 0; i < 12; i++) {
                    current = current.month(i);
                    months.push(localeData.monthsShort(current));
                }
                for (let i = start; i < end; i++) {
                    monthOptions.push(
                        <Select.Option key={i} value={i} className="month-item">
                            {months[i]}
                        </Select.Option>,
                    );
                }
                const year = value.year();
                const month = value.month();
                const options = [];
                for (let i = year - 10; i < year + 10; i += 1) {
                    options.push(
                        <Select.Option key={i} value={i} className="year-item">
                            {i}
                        </Select.Option>,
                    );
                }
                return (
                    <div
                        style={{
                            padding: 8,
                        }}
                    >
                        <Row justify="space-between">
                            <Col>
                                <Row gutter={8}>
                                    <Col>
                                        <Radio.Group
                                            size="small"
                                            onChange={(e) => onTypeChange(e.target.value)}
                                            value={type}
                                        >
                                            <Radio.Button value="month">Month</Radio.Button>
                                            <Radio.Button value="year">Year</Radio.Button>
                                        </Radio.Group>
                                    </Col>
                                    <Col>
                                        <Select
                                            size="small"
                                            dropdownMatchSelectWidth={false}
                                            className="my-year-select"
                                            value={year}
                                            onChange={(newYear) => {
                                                const now = value.clone().year(newYear);
                                                onChange(now);
                                            }}
                                        >
                                            {options}
                                        </Select>
                                    </Col>
                                    <Col>
                                        <Select
                                            size="small"
                                            dropdownMatchSelectWidth={false}
                                            value={month}
                                            onChange={(newMonth) => {
                                                const now = value.clone().month(newMonth);
                                                onChange(now);
                                            }}
                                        >
                                            {monthOptions}
                                        </Select>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <img
                                    onClick={() => navigate('/calendar')}
                                    src={arrowRight}
                                    alt={lan.calendar}
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                />
                            </Col>
                        </Row>
                    </div>
                );
            }}
            cellRender={cellRender}
            fullscreen={false}/>
    );
};

export default MiniCalendar;