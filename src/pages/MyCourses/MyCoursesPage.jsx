import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {changeCurrentPage} from '../../store/slices/tableController/MyCoursesTableController';
import {getAllMyCourses} from '../../store/slices/coursesSlice';
import {lan} from '../../constants/lan';
import Text from '../../components/UI/Text/Text';
import {LocalName} from '../../utils/LocalName';
import FlexBlock from '../../components/UI/FlexBlock/FlexBlock';
import {clrs} from '../../constants/colors';
import HeaderPlatform from '../../components/HeaderPlatform/HeaderPlatform';
import Block from '../../components/UI/Block/Block';
import Card from '../../components/LoadingComponents/Card';
import TableWithPagination from '../../components/TableWithPagination/TableWithPagination';
import {Badge} from 'antd';

const MyCoursesPage = () => {
    const {courses, hasMore, isLoading} = useSelector(state => state.courses);

    const {user} = useSelector(state => state.user);


    const {currentPage, pageSize} = useSelector(state => state.myCoursesTableController);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(changeCurrentPage({ page: 1, limit: 5 }));
        dispatch(getAllMyCourses({ page: 1, limit: 5 }));
    }, [navigate])

    const fetchData = async (params) => {
        return dispatch(getAllMyCourses(params));
    };

    const saveCurrentPageSettings = (page, pageSize) => {
        dispatch(changeCurrentPage({ page: page, pageSize: pageSize }));
    };

    function getPercentage(num, max) {
        return (num / max) * 100;
    }

    const columns = [
        {
            title: lan.course,
            render: (_, record) => <Text>{LocalName.getName(record)}</Text>,
        },
        {
            title: lan.status,
            render: (_, record) => (
                record.userStatus === 'FINISHED' ?
                    <Badge status="success" text={lan.finished}/>
                    :
                    <Badge status="processing" text={lan.inProgress}/>
            ),
            width: '15%',
        },
        {
            title: lan.progress,
            render: (_, record) => (
                <FlexBlock>
                    <Text> {getPercentage(record.progress, record.maxProgress)} % </Text>
                </FlexBlock>
            ),
            width: '10%',
        },
        {
            title: lan.trainer,
            render: (_, record) => <Link  to={`/profile/${record.trainer.username}`} target="_blank">{record.trainer.fullName}</Link>,
            width: '20%',
        },
        {
            title: lan.actions,
            render: (_, record) => (
                <FlexBlock>
                    <Text onClick={() => {navigate(`/course/${record.id}`)}} type={"button"}>{lan.view}</Text>
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
                    <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.coursesMy}</Text>
                    <Card type={"horizontal"}/>
                </Block>
            </div>
        );
    }

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px", alignItems: "flex-start", gap: "20px"}}>
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.coursesMy}</Text>
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

export default MyCoursesPage;