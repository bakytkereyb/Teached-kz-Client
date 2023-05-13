import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {changeCurrentPage} from '../../../store/slices/tableController/AdminCoursersTableController';
import {lan} from '../../../constants/lan';
import Text from '../../../components/UI/Text/Text';
import {LocalName} from '../../../utils/LocalName';
import FlexBlock from '../../../components/UI/FlexBlock/FlexBlock';
import TableWithPagination from '../../../components/TableWithPagination/TableWithPagination';
import {deletePostCourseById, getAllPostCourses} from '../../../store/slices/admin/adminPostCourseSlice';
import AdminPostCourseService from '../../../services/AdminPostCourseService';

const AdminPostCourseList = () => {
    const {courses, hasMore, isLoading, isLoadingDeleteCourse} = useSelector(state => state.adminPostCourse);

    const {currentPage, pageSize} = useSelector(state => state.adminCoursesTableController);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(courses)
    }, [courses])

    const fetchData = async (params) => {
        return dispatch(getAllPostCourses(params));
    };

    const saveCurrentPageSettings = (page, pageSize) => {
        dispatch(changeCurrentPage({ page: page, pageSize: pageSize }));
    };

    async function handleDeleteCourse(id) {
        await dispatch(deletePostCourseById({id: id}));
        await dispatch(changeCurrentPage({ page: 1, limit: 5 }));
        await dispatch(getAllPostCourses({ page: 1, limit: 5 }));
    }

    async function changeCourseStatus(id, status) {
        if (status === 'PRIVATE') {
            AdminPostCourseService.makePostCourseAsPrivate(id)
                .then(async () => {
                    await dispatch(changeCurrentPage({page: 1, limit: 5}));
                    await dispatch(getAllPostCourses({page: 1, limit: 5}));
                })
        }
        if (status === 'PUBLIC') {
            AdminPostCourseService.makePostCourseAsPublic(id)
                .then(async () => {
                    await dispatch(changeCurrentPage({page: 1, limit: 5}));
                    await dispatch(getAllPostCourses({page: 1, limit: 5}));
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
                    <Text onClick={() => {window.open(`/post-course/${record.id}/view`, "_blank")}} type={"button"}>{lan.view}</Text>
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
            expandable={{
                expandedRowRender: (record) => <Text normalWeight>{LocalName.getDescription(record)}</Text>,
            }}
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

export default AdminPostCourseList;