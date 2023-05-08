import React, {useEffect, useState} from 'react';
import Text from "../../../../components/UI/Text/Text";
import Block from "../../../../components/UI/Block/Block";
import {useDispatch, useSelector} from "react-redux";
import {lan} from "../../../../constants/lan";
import {LocalName} from "../../../../utils/LocalName";
import FlexBlock from "../../../../components/UI/FlexBlock/FlexBlock";
import {useNavigate} from "react-router-dom";
import {Pagination, Table} from "antd";
import TableWithPagination from "../../../../components/TableWithPagination/TableWithPagination";
import {deleteCourseById, getAllCourses} from "../../../../store/slices/admin/adminCourseSlice";
import {changeCurrentPage} from "../../../../store/slices/tableController/AdminCoursersTableController";
import AdminCourseService from "../../../../services/AdminCourseService";

const AdminCourseList = () => {
    const {courses, hasMore, isLoading, isLoadingDeleteCourse} = useSelector(state => state.adminCourse);

    const {currentPage, pageSize} = useSelector(state => state.adminCoursesTableController);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(courses)
    }, [courses])

    const fetchData = async (params) => {
        return dispatch(getAllCourses(params));
    };

    const saveCurrentPageSettings = (page, pageSize) => {
        dispatch(changeCurrentPage({ page: page, pageSize: pageSize }));
    };

    async function handleDeleteCourse(id) {
        await dispatch(deleteCourseById({id: id}));
        await dispatch(changeCurrentPage({ page: 1, limit: 5 }));
        await dispatch(getAllCourses({ page: 1, limit: 5 }));
    }

    async function changeCourseStatus(id, status) {
        if (status === 'PRIVATE') {
            AdminCourseService.makeCourseAsPrivate(id)
                .then(async () => {
                    await dispatch(changeCurrentPage({page: 1, limit: 5}));
                    await dispatch(getAllCourses({page: 1, limit: 5}));
                })
        }
        if (status === 'PUBLIC') {
            AdminCourseService.makeCourseAsPublic(id)
                .then(async () => {
                    await dispatch(changeCurrentPage({page: 1, limit: 5}));
                    await dispatch(getAllCourses({page: 1, limit: 5}));
                })
        }

    }

    const columns = [
        {
            title: lan.course,
            render: (_, record) => <Text>{LocalName.getName(record)}</Text>,
        },
        {
            title: lan.status,
            render: (_, record) => <Text>{record.status}</Text>,
            width: '10%',
        },
        {
            title: lan.actions,
            render: (_, record) => (
                <FlexBlock>
                    <Text type={"button"}>{lan.view}</Text>
                    {
                        record.status === 'PUBLIC' ?
                            <Text onClick={() => {changeCourseStatus(record.id, 'PRIVATE')}} type={"button-red"}>{lan.deactivate}</Text>
                            :
                            <Text onClick={() => {changeCourseStatus(record.id, 'PUBLIC')}} type={"button-green"}>{lan.activate}</Text>
                    }
                    <Text onClick={() => {handleDeleteCourse(record.id)}} type={"button-black"}>{lan.delete}</Text>
                </FlexBlock>
            ),
            width: '30%',
        },
    ];

    return (
        <TableWithPagination
            isLoading={isLoading || isLoadingDeleteCourse}
            dataSource={courses}
            columns={columns}
            fetchData={fetchData}
            saveCurrentPage={saveCurrentPageSettings}
            initialPage={currentPage}
            initialPageSize={pageSize}
            hasMore={hasMore}
        />
    );
};

export default AdminCourseList;