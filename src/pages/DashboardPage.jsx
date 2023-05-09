import React, {useEffect, useState} from 'react';
import {clrs} from "../constants/colors";
import HeaderPlatform from "../components/HeaderPlatform/HeaderPlatform";
import Block from "../components/UI/Block/Block";
import MyTasks from "../components/MyTasksCard/MyTasks";
import Course from "../components/CourseCard/Course";
import MyMasonry from "../components/Masonry/MyMasonry";
import Card from "../components/LoadingComponents/Card";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Badge, Calendar, Col, Radio, Row, Select} from "antd";
import data from "../pages/Calendar/data.json";
import style from "./Calendar/Calendar.module.css";
import arrowRight from "../images/arrow-circle-right.svg";
import {lan} from "../constants/lan";

const getListData = (value) => {
    const date = value.date();
    const month = value.month();

    const filteredData = data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getDate() === date && itemDate.getMonth() === month;
    });

    const listData = filteredData.map(item => ({
        type: item.type,
        content: item.content,
    }));

    return listData;
};

const getMonthData = (value) => {
    if (value.month() === 8) {
        return null;
    }
};

const DashboardPage = () => {
        const [isLoading, setLoading] = useState(false);
        const [isHovered, setIsHovered] = useState(null);
        const {admin} = useSelector(state => state.user.user);

        const navigate = useNavigate();

        useEffect(() => {
            if (admin) {
                navigate('/admin/my');
            }
        }, [admin])

        if (isLoading) {
            return (
                <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
                    <HeaderPlatform/>
                    <Block style={{marginTop: "50px"}}>
                        <MyMasonry>
                            <Card type={"calendar"}/>
                            <Card/>
                            <Card type={"big-card"}/>
                            <Card/>
                            <Card/>
                            <Card/>
                        </MyMasonry>
                    </Block>
                </div>
            );
        }


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
                        <li key={item.content}>
                            <Badge
                                status={item.type}
                                style={{
                                    padding: '8px',
                                    textDecoration: isHovered === item.content ? 'underline' : 'none',
                                }}
                                onMouseEnter={() => handleMouseEnter(item.content)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => alert(item.content)}
                            />
                        </li>
                    ))}
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
            <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
                <HeaderPlatform/>
                <Block style={{marginTop: "50px"}}>
                    <MyMasonry>
                        <Calendar
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
                        <MyTasks/>
                        <MyTasks/>
                        <Course/>
                        <Course/>
                        {/*<Course/>*/}
                        <Course pre={1}/>
                        {/*<Course pre={1}/>*/}
                        {/*<MyTasks/>*/}
                    </MyMasonry>
                </Block>
            </div>
        );
    }
;

export default DashboardPage;