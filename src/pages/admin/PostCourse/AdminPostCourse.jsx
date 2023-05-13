import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeCurrentPage} from '../../../store/slices/tableController/AdminCoursersTableController';
import {clrs} from '../../../constants/colors';
import HeaderPlatform from '../../../components/HeaderPlatform/HeaderPlatform';
import Block from '../../../components/UI/Block/Block';
import Text from '../../../components/UI/Text/Text';
import {lan} from '../../../constants/lan';
import TabBlock from '../../../components/UI/TabBlock/TabBlock';
import TabItem from '../../../components/UI/TabBlock/TabItem';
import AdminCourseList from '../AdminCourse/Components/AdminCourseList';
import BlockLoading from '../../../components/LoadingComponents/BlockLoading';
import AdminCourseCreate from '../AdminCourse/Components/AdminCourseCreate';
import {getAllPostCourses} from '../../../store/slices/admin/adminPostCourseSlice';
import AdminPostCourseList from './AdminPostCourseList';
import AdminPostCourseCreate from './AdminPostCourseCreate';

const AdminPostCourse = () => {
    const tabNum = useSelector(state => state.tabBlock.tabNum);
    const dispatch = useDispatch();

    useEffect(() => {
        if (tabNum === 0) {
            dispatch(changeCurrentPage({ page: 1, limit: 5 }));
            dispatch(getAllPostCourses({ page: 1, limit: 5 }));
        }
    }, [tabNum])
    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px"}}>
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.courses}</Text>
                <TabBlock headers={[lan.postCoursesList, lan.createPostCourse]}>
                    <TabItem item={0}>
                        <AdminPostCourseList/>
                    </TabItem>
                    <TabItem item={1}>
                        <BlockLoading/>
                        <Block style={{padding: 0}}>
                            <AdminPostCourseCreate/>
                        </Block>
                    </TabItem>
                </TabBlock>
            </Block>
        </div>
    );
};

export default AdminPostCourse;