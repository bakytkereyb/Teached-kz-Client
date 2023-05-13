import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {changeCurrentPage} from '../../store/slices/tableController/CoursesTableController';
import {lan} from '../../constants/lan';
import Text from '../../components/UI/Text/Text';
import {LocalName} from '../../utils/LocalName';
import FlexBlock from '../../components/UI/FlexBlock/FlexBlock';
import {clrs} from '../../constants/colors';
import HeaderPlatform from '../../components/HeaderPlatform/HeaderPlatform';
import Block from '../../components/UI/Block/Block';
import Card from '../../components/LoadingComponents/Card';
import TableWithPagination from '../../components/TableWithPagination/TableWithPagination';
import {getAllPublicPostCourses} from '../../store/slices/postCoursesSlice';
import PostCourseService from '../../services/PostCoursesService';

const PostCourses = () => {
    const {courses, hasMore, isLoading} = useSelector(state => state.post_courses);

    const {user} = useSelector(state => state.user);


    const {currentPage, pageSize} = useSelector(state => state.coursesTableController);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(changeCurrentPage({ page: 1, limit: 5 }));
        dispatch(getAllPublicPostCourses({ page: 1, limit: 5 }));
    }, [navigate])

    const fetchData = async (params) => {
        return dispatch(getAllPublicPostCourses(params));
    };

    const saveCurrentPageSettings = (page, pageSize) => {
        dispatch(changeCurrentPage({ page: page, pageSize: pageSize }));
    };

    async function handleRegisterCourse(id) {
        await PostCourseService.registerUserToPostCourse(id)
            .then(async () => {
                await dispatch(changeCurrentPage({page: 1, limit: 5}));
                await dispatch(getAllPublicPostCourses({page: 1, limit: 5}));
            })
    }

    const columns = [
        {
            title: lan.course,
            render: (_, record) => <Text>{LocalName.getName(record)}</Text>,
        },
        {
            title: lan.actions,
            render: (_, record) => (
                <FlexBlock>
                    {
                        !record.students.find(student => student.id === user.id) &&
                        <Text onClick={() => {handleRegisterCourse(record.id)}} type={"button"}>{lan.register}</Text>
                    }
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
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.postCourses}</Text>
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

export default PostCourses;