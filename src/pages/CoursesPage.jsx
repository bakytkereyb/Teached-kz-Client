import React, {useEffect, useState} from 'react';
import Block from "../components/UI/Block/Block";
import {clrs} from "../constants/colors";
import HeaderPlatform from "../components/HeaderPlatform/HeaderPlatform";
import Card from "../components/LoadingComponents/Card";
import Text from "../components/UI/Text/Text";
import {lan} from "../constants/lan";
import FlexBlock from "../components/UI/FlexBlock/FlexBlock";
import {LocalName} from "../utils/LocalName";
import TableWithPagination from "../components/TableWithPagination/TableWithPagination";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getAllPublicCourses} from "../store/slices/coursesSlice";
import {changeCurrentPage} from "../store/slices/tableController/CoursesTableController";

const CoursesPage = () => {

    const {courses, hasMore, isLoading} = useSelector(state => state.courses);

    const {currentPage, pageSize} = useSelector(state => state.coursesTableController);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(changeCurrentPage({ page: 1, limit: 5 }));
        dispatch(getAllPublicCourses({ page: 1, limit: 5 }));
    }, [navigate])

    const fetchData = async (params) => {
        return dispatch(getAllPublicCourses(params));
    };

    const saveCurrentPageSettings = (page, pageSize) => {
        dispatch(changeCurrentPage({ page: page, pageSize: pageSize }));
    };

    const columns = [
        {
            title: lan.course,
            render: (_, record) => <Text>{LocalName.getName(record)}</Text>,
        },
        {
            title: lan.actions,
            render: (_, record) => (
                <FlexBlock>
                    <Text type={"button"}>{lan.view}</Text>
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
                    <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.courses}</Text>
                    <Card type={"horizontal"}/>
                </Block>
            </div>
        );
    }

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px", alignItems: "flex-start", gap: "20px"}}>
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.courses}</Text>
                <FlexBlock style={{
                    backgroundColor: clrs.white,
                    borderRadius: "15px",
                    padding: "20px",
                    width: "calc(100% - 40px)",
                }}>
                    <TableWithPagination
                        expandable={{
                            expandedRowRender: (record) => <Text normalWeight>{LocalName.getDescription(record)}</Text>,
                        }}
                        isLoading={isLoading}
                        dataSource={courses}
                        columns={columns}
                        fetchData={fetchData}
                        saveCurrentPage={saveCurrentPageSettings}
                        initialPage={currentPage}
                        initialPageSize={pageSize}
                        hasMore={hasMore}
                    />
                </FlexBlock>

            </Block>
        </div>
    );
};

export default CoursesPage;