import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllCourses} from "../../../../store/slices/admin/adminCourseSlice";
import Block from "../../../../components/UI/Block/Block";
import Text from "../../../../components/UI/Text/Text";

const AdminUsersList = () => {
    return (
        <Block style={{padding: 0, gap: "20px"}}>
                <Text default>In developing...</Text>
        </Block>
    );
};

export default AdminUsersList;