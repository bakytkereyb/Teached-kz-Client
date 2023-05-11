import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {changeCurrentPage} from "../../../store/slices/tableController/CourseStudentsViewController";
import {getAllCourseStudents} from "../../../store/slices/courseStudentsSlice";
import {lan} from "../../../constants/lan";
import Text from "../../../components/UI/Text/Text";
import TableWithPagination from "../../../components/TableWithPagination/TableWithPagination";
import {clrs} from "../../../constants/colors";
import FlexBlock from "../../../components/UI/FlexBlock/FlexBlock";

const CourseViewStudents = () => {
    const {students, hasMore, isLoading} = useSelector(state => state.courseStudents)
    const {currentPage, pageSize} = useSelector(state => state.courseStudentsViewController);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        dispatch(changeCurrentPage({page: 1, limit: 5}));
        dispatch(getAllCourseStudents({page: 1, limit: 5, id: id}));
    }, [])

    useEffect(() => {
        console.log(students)
    }, [students])
    const fetchData = async (params) => {
        return dispatch(getAllCourseStudents({...params, id}));
    };

    const saveCurrentPageSettings = (page, pageSize) => {
        dispatch(changeCurrentPage({page: page, pageSize: pageSize}));
    };

    const columns = [
        {
            title: lan.fullName + ` (${lan.username})`,
            render: (_, record) => <Text normalWeight>{record.fullName} <b>({record.username})</b></Text>,
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
            <TableWithPagination
                isLoading={isLoading}
                dataSource={students}
                columns={columns}
                fetchData={fetchData}
                saveCurrentPage={saveCurrentPageSettings}
                initialPage={currentPage}
                initialPageSize={pageSize}
                hasMore={hasMore}
            />
        </FlexBlock>

    );
};

export default CourseViewStudents;