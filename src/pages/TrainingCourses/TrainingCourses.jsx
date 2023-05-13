import React, {useEffect} from 'react';
import {clrs} from "../../constants/colors";
import HeaderPlatform from "../../components/HeaderPlatform/HeaderPlatform";
import Block from "../../components/UI/Block/Block";
import Text from "../../components/UI/Text/Text";
import {lan} from "../../constants/lan";
import FlexBlock from "../../components/UI/FlexBlock/FlexBlock";
import Card from "../../components/LoadingComponents/Card";
import {LocalName} from "../../utils/LocalName";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import TableWithPagination from "../../components/TableWithPagination/TableWithPagination";
import {changeCurrentPage} from "../../store/slices/tableController/TrainingCoursesTableController";
import {getAllTrainingCourses} from "../../store/slices/trainingCoursesSlice";

const TrainingCourses = () => {

    const {trainingCourses, hasMore, isLoading} = useSelector(state => state.trainingCourses);

    const {currentPage, pageSize} = useSelector(state => state.trainingCoursesTableController);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(trainingCourses)

    useEffect(() => {
        dispatch(changeCurrentPage({page: 1, limit: 5}));
        dispatch(getAllTrainingCourses({page: 1, limit: 5}));
    }, [navigate])

    const fetchData = async (params) => {
        return dispatch(getAllTrainingCourses(params));
    };

    const saveCurrentPageSettings = (page, pageSize) => {
        dispatch(changeCurrentPage({page: page, pageSize: pageSize}));
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
                    <Text onClick={() => navigate(`/course/${record.id}/view`)} type={"button"}>{lan.view}</Text>
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
                    <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.trainingCourses}</Text>
                    <Card type={"horizontal"}/>
                </Block>
            </div>
        );
    }

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px", alignItems: "flex-start", gap: "20px"}}>
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.trainingCourses}</Text>
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
                        dataSource={trainingCourses}
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

export default TrainingCourses;