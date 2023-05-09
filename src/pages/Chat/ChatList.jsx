import React, {useState} from 'react';
import TableWithPagination from "../../components/TableWithPagination/TableWithPagination";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {getAllUsers} from "../../store/slices/admin/adminUserSlice";
import {changeCurrentPage} from "../../store/slices/tableController/ChatUsersTableController";
import {lan} from "../../constants/lan";
import Text from "../../components/UI/Text/Text";
import {Badge} from "antd";
import FlexBlock from "../../components/UI/FlexBlock/FlexBlock";
import {clrs} from "../../constants/colors";
import HeaderPlatform from "../../components/HeaderPlatform/HeaderPlatform";
import Block from "../../components/UI/Block/Block";
import FormInput from "../../components/Form/FormInput";
import FormBlock from "../../components/Form/FormBlock";
import Button from "../../components/UI/Button/Button";

const ChatList = () => {

    const {users, hasMore, isLoading} = useSelector(state => state.adminUser)
    const {currentPage, pageSize} = useSelector(state => state.chatUsersTableController);
    const [searchName, setSearchName] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchData = async (params) => {
        return dispatch(getAllUsers(params));
    };

    const saveCurrentPageSettings = (page, pageSize) => {
        dispatch(changeCurrentPage({page: page, pageSize: pageSize}));
    };

    const columns = [
        {
            title: lan.fullName + ` (${lan.username})`,
            render: (_, record) => <Text normalWeight>{record.fullName} <b>({record.username})</b></Text>,
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
                    <Text type={"button"}>{lan.view}</Text>
                    {
                        record.admin ?
                            <Text type={"button-green"}>{lan.trainer}</Text>
                            :
                            <Text type={"button-red"}>{lan.admin}</Text>
                    }
                </FlexBlock>
            ),
            width: '20%',
        },
    ];

    async function onSubmitSearchUsers(e) {
        e.preventDefault();
        console.log(searchName)
        alert(searchName)
        dispatch(changeCurrentPage({page: 1, pageSize: 1}));

        dispatch(getAllUsers({page: 1, limit: 1}));
    }

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px"}}>
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.chats}</Text>
                <FormBlock style={{flexDirection: 'row', justifyContent: 'start'}} onSubmit={onSubmitSearchUsers}>
                    <FormInput
                        labelText={lan.fullName}
                        id={"searchName"}
                        type={"text"}
                        required={false}
                        value={searchName}
                        onChange={setSearchName}
                        maxWidth={"20%"}
                        withoutLabel={true}
                    />
                    <Button>Search</Button>
                </FormBlock>
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
            </Block>
        </div>
    );
};

export default ChatList;