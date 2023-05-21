import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {deleteCourseById, getAllCourses} from '../../../store/slices/admin/adminCourseSlice';
import {changeCurrentPage} from '../../../store/slices/tableController/AdminCoursersTableController';
import AdminCourseService from '../../../services/AdminCourseService';
import {lan} from '../../../constants/lan';
import Text from '../../../components/UI/Text/Text';
import {LocalName} from '../../../utils/LocalName';
import FlexBlock from '../../../components/UI/FlexBlock/FlexBlock';
import TableWithPagination from '../../../components/TableWithPagination/TableWithPagination';
import HorizontalDivider from '../../../components/UI/Divider/HorizontalDivider';
import Chart from 'react-apexcharts';
import classes from './analytics.module.css';
import {getCourseAnalyticsById} from '../../../store/slices/admin/analyticsSlice';

const CourseAnalytics = () => {
    const {courses, hasMore, isLoading} = useSelector(state => state.adminCourse);

    const {currentPage, pageSize} = useSelector(state => state.adminCoursesTableController);

    const courseAnalytics = useSelector(state => state.analytics.course);

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

    function getAnalytics(id) {
        dispatch(getCourseAnalyticsById({id}));
    }

    const columns = [
        {
            title: lan.course,
            render: (_, record) => <Text>{LocalName.getName(record)}</Text>,
        },
        {
            title: lan.trainer,
            render: (_, record) => <Link  to={`/profile/${record.trainer.username}`} target="_blank">{record.trainer.fullName}</Link>,
            width: '25%',
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
                    <Text onClick={() => {getAnalytics(record.id)}} type={"button"}>{lan.analytics}</Text>
                </FlexBlock>
            ),
            width: '10%',
        },
    ];

    const config = {
        options: {
            labels: [lan.passedStudents, lan.notPassedStudents],
        },

        series: [courseAnalytics.analytics?.closedStudents, courseAnalytics.analytics?.totalStudents - courseAnalytics.analytics?.closedStudents],
    };

    return (
        <FlexBlock style={{flexDirection: 'column'}}>
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
            <HorizontalDivider/>
            {
                courseAnalytics.analytics &&
                <>
                    <Text default>{LocalName.getName(courseAnalytics.analytics)}</Text>
                    <Text default>{lan.totalNumberOfStudents} : {courseAnalytics.analytics?.totalStudents}</Text>
                    <FlexBlock>
                        <Chart
                            options={config.options}
                            series={config.series}
                            type="pie"
                            className={classes.myPie}
                        />
                    </FlexBlock>
                </>
            }

        </FlexBlock>

    );
};

export default CourseAnalytics;