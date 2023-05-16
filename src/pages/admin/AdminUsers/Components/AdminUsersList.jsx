import React from 'react';
import TableWithPagination from "../../../../components/TableWithPagination/TableWithPagination";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {changeUserRole, getAllUsers} from "../../../../store/slices/admin/adminUserSlice"
import {lan} from "../../../../constants/lan";
import Text from "../../../../components/UI/Text/Text";
import FlexBlock from "../../../../components/UI/FlexBlock/FlexBlock";
import {Badge} from "antd";
import {changeCurrentPage} from "../../../../store/slices/tableController/AdminUsersTableController";
import {NotificationManager} from "react-notifications";

const AdminUsersList = () => {
    const {users, hasMore, isLoading} = useSelector(state => state.adminUser)
    const {currentPage, pageSize} = useSelector(state => state.adminUsersTableController);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchData = async (params) => {
        return dispatch(getAllUsers(params));
    };

    const saveCurrentPageSettings = (page, pageSize) => {
        dispatch(changeCurrentPage({page: page, pageSize: pageSize}));
    };

    const changeRole = async (id, role) => {
        console.log(role)
        try {
            await dispatch(changeUserRole({id, roleName: role}))
            dispatch(getAllUsers({page: currentPage, limit: pageSize}));
            NotificationManager.success(lan.roleChanged)
        } catch (e) {
            NotificationManager.error(lan.roleChangeFail)
        }
    }

    const columns = [
        {
            title: lan.fullName + ` (${lan.username})`,
            render: (_, record) => <Text normalWeight>{record.fullName} <b>({record.username})</b></Text>,
        },
        {
            title: lan.roleName,
            render: (_, record) => <Text
                normalWeight>{record.admin ? lan.admin : (record.trainer ? lan.trainer : lan.user)}</Text>,
            width: '10%',
        },
        {
            title: lan.fullFilled,
            render: (_, record) => (
                record.fullFilled ?
                    <Badge status="success" text={lan.filled}/>
                    :
                    <Badge status="default" text={lan.notFilled}/>
            ),
            width: '10%',
        },
        {
            title: lan.profile,
            render: (_, record) => (
                <Link to={`/profile/${record.username}`} target="_blank">{lan.view}</Link>
            ),
            width: '5%',
        },
        {
            title: lan.actions,
            render: (_, record) => (
                <FlexBlock>
                    {
                        !record.admin && (
                            record.trainer ?
                                <Text onClick={() => changeRole(record.id, 'user')} type={"button-green"}>{lan.user}</Text>
                                :
                                <Text onClick={() => changeRole(record.id, 'trainer')}
                                      type={"button-red"}>{lan.trainer}</Text>
                        )
                    }
                </FlexBlock>
            ),
            width: '10%',
        },
    ];


    return (
        <TableWithPagination
            isLoading={isLoading}
            dataSource={users}
            columns={columns}
            fetchData={fetchData}
            saveCurrentPage={saveCurrentPageSettings}
            initialPage={currentPage}
            initialPageSize={pageSize}
            hasMore={hasMore}
        />
    );
};

export default AdminUsersList;