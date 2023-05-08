import React, {useEffect} from 'react';
import {clrs} from "../../../constants/colors";
import HeaderPlatform from "../../../components/HeaderPlatform/HeaderPlatform";
import Block from "../../../components/UI/Block/Block";
import Text from "../../../components/UI/Text/Text";
import TabBlock from "../../../components/UI/TabBlock/TabBlock";
import TabItem from "../../../components/UI/TabBlock/TabItem";
import BlockLoading from "../../../components/LoadingComponents/BlockLoading";
import AdminCourseList from "./Components/AdminCourseList";
import AdminCourseCreate from "./Components/AdminCourseCreate";
import {useDispatch, useSelector} from "react-redux";
import {getCompetenceBank} from "../../../store/slices/competenceSlice";
import {getAllCourses} from "../../../store/slices/admin/adminCourseSlice";
import {changeCurrentPage} from "../../../store/slices/tableController/AdminCoursersTableController";
import {getAllTrainers} from "../../../store/slices/trainerListSlice";
import {lan} from "../../../constants/lan";

const AdminCourse = () => {
    const tabNum = useSelector(state => state.tabBlock.tabNum);
    const dispatch = useDispatch();

    useEffect(() => {
        if (tabNum === 0) {
            dispatch(changeCurrentPage({ page: 1, limit: 5 }));
            dispatch(getAllCourses({ page: 1, limit: 5 }));
        }
        if (tabNum === 1) {
            dispatch(getAllTrainers())
        }
    }, [tabNum])
    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px"}}>
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.courses}</Text>
                <TabBlock headers={[lan.coursesList, lan.createCourse]}>
                    <TabItem item={0}>
                        <AdminCourseList/>
                    </TabItem>
                    <TabItem item={1}>
                        <BlockLoading/>
                        <Block style={{padding: 0}}>
                            <AdminCourseCreate/>
                        </Block>
                    </TabItem>
                </TabBlock>
            </Block>
        </div>
    );
};

export default AdminCourse;