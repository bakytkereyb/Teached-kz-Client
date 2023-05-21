import React, {useEffect} from 'react';
import {clrs} from '../../../constants/colors';
import HeaderPlatform from '../../../components/HeaderPlatform/HeaderPlatform';
import {lan} from '../../../constants/lan';
import Text from '../../../components/UI/Text/Text';
import Block from '../../../components/UI/Block/Block';
import TabBlock from '../../../components/UI/TabBlock/TabBlock';
import TabItem from '../../../components/UI/TabBlock/TabItem';
import CompetenceAnalytics from './CompetenceAnalytics';
import UserAnalytics from './UserAnalytics';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getCompetenceBankAnalytics, getUserAnalytics} from '../../../store/slices/admin/analyticsSlice';
import Card from '../../../components/LoadingComponents/Card';
import CourseAnalytics from './CourseAnalytics';
import {changeCurrentPage} from '../../../store/slices/tableController/AdminCoursersTableController';
import {getAllCourses} from '../../../store/slices/admin/adminCourseSlice';

const AnalyticsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tabNum = useSelector(state => state.tabBlock.tabNum)

    useEffect(() => {
        dispatch(getUserAnalytics());
        if (tabNum === 1) {
            dispatch(getCompetenceBankAnalytics())
        }
        if (tabNum === 2) {
            dispatch(changeCurrentPage({ page: 1, limit: 5 }));
            dispatch(getAllCourses({ page: 1, limit: 5 }));
        }
    }, [tabNum, navigate])

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px"}}>
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.analytics}</Text>
                <TabBlock headers={[lan.users, lan.competenceBank, lan.courses]}>
                    <TabItem item={0}>
                        <UserAnalytics/>
                    </TabItem>
                    <TabItem item={1}>
                        <CompetenceAnalytics/>
                    </TabItem>
                    <TabItem item={2}>
                        <CourseAnalytics/>
                    </TabItem>
                </TabBlock>
            </Block>
        </div>
    );
};

export default AnalyticsPage;