import React, {useState} from 'react';
import {clrs} from "../../constants/colors";
import {Badge, Calendar} from "antd";
import HeaderPlatform from "../../components/HeaderPlatform/HeaderPlatform";
import Block from "../../components/UI/Block/Block";
import style from "./Calendar.module.css";
import data from './data.json';
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
        return 1394;
    }
};
const CalendarPage = () => {
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
                    <li key={item.content}>
                        <Badge
                            status={item.type}
                            text={item.content}
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
    const cellRender = (current, info) => {
        if (info.type === 'date') return dateFullCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };
    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "10px"}}>
                <Calendar cellRender={cellRender}/>
            </Block>
        </div>
    );
};

export default CalendarPage;