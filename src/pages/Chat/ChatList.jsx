import React, {useEffect, useState} from 'react';
import TableWithPagination from "../../components/TableWithPagination/TableWithPagination";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {lan} from "../../constants/lan";
import Text from "../../components/UI/Text/Text";
import FlexBlock from "../../components/UI/FlexBlock/FlexBlock";
import {clrs} from "../../constants/colors";
import HeaderPlatform from "../../components/HeaderPlatform/HeaderPlatform";
import Block from "../../components/UI/Block/Block";
import {changeCurrentPage} from '../../store/slices/tableController/MyChatsTableController';
import {changeCurrentPage as changeCurrentPageUsers} from '../../store/slices/tableController/ChatUsersTableController';
import {getAllMyChats} from '../../store/slices/chat/chatsSlice';
import {Table} from 'antd';
import FormBlock from '../../components/Form/FormBlock';
import FormInput from '../../components/Form/FormInput';
import Button from '../../components/UI/Button/Button';
import {getAllUsersByName, resetState, setLoading} from '../../store/slices/admin/adminUserSlice';
import ChatService from '../../services/ChatService';
import {NotificationManager} from 'react-notifications';

const ChatList = () => {

    const {chats, hasMore, isLoading} = useSelector(state => state.chats)
    const {currentPage, pageSize} = useSelector(state => state.myChatsTableController);

    const users = useSelector(state => state.adminUser)
    const chatUsersTableController = useSelector(state => state.chatUsersTableController);

    const [searchName, setSearchName] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(changeCurrentPage({ page: 1, limit: 5 }));
        dispatch(getAllMyChats({ page: 1, limit: 5 }));
        dispatch(resetState());
        dispatch(setLoading(false));
    }, [navigate])

    const fetchData = async (params) => {
        return dispatch(getAllMyChats(params));
    };

    const fetchData2 = async (params) => {
        return dispatch(getAllUsersByName({...params, name: searchName}));
    };

    const saveCurrentPageSettings = (page, pageSize) => {
        dispatch(changeCurrentPage({page: page, pageSize: pageSize}));
    };

    const saveCurrentPageSettings2 = (page, pageSize) => {
        dispatch(changeCurrentPageUsers({page: page, pageSize: pageSize}));
    };

    async function handleChatBtn(userID) {
        await ChatService.saveChat(userID)
            .then((r) => {
                navigate(`/chat/${r.data.id}`)
            })
            .catch(() => {
                NotificationManager.error(lan.error);
            })
    }

    const columns = [
        {
            title: lan.fullName + ` (${lan.username})`,
            render: (_, record) => <Text normalWeight>{record.user.fullName} <b>({record.user.username})</b></Text>,
        },
        {
            title: lan.profile,
            render: (_, record) => (
                <Link to={`/profile/${record.user.username}`} target="_blank">{lan.view}</Link>
            ),
            width: '5%',
        },
        {
            title: lan.actions,
            render: (_, record) => (
                <FlexBlock>
                    <Text onClick={() => {navigate(`/chat/${record.id}`)}} type={"button"}>{lan.view}</Text>
                </FlexBlock>
            ),
            width: '10%',
        },
    ];

    const columns2 = [
        {
            title: lan.fullName + ` (${lan.username})`,
            render: (_, record) => <Text normalWeight>{record.fullName} <b>({record.username})</b></Text>,
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
                    <Text onClick={() => {handleChatBtn(record.id)}} type={"button"}>{lan.chat}</Text>
                </FlexBlock>
            ),
            width: '10%',
        },
    ]

    async function onSubmitSearchUsers(e) {
        e.preventDefault();
        await dispatch(changeCurrentPageUsers({page: 1, pageSize: 5}));
        await dispatch(getAllUsersByName({page: 1, limit: 5, name: searchName}))
    }

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px", alignItems: "flex-start"}}>
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.chats}</Text>
                <FlexBlock style={{
                    backgroundColor: clrs.white,
                    borderRadius: "15px",
                    padding: "20px",
                    width: "calc(100% - 40px)",
                }}>
                    <TableWithPagination
                        isLoading={isLoading}
                        dataSource={chats}
                        columns={columns}
                        fetchData={fetchData}
                        saveCurrentPage={saveCurrentPageSettings}
                        initialPage={currentPage}
                        initialPageSize={pageSize}
                        hasMore={hasMore}
                    />
                </FlexBlock>
                <FormBlock style={{flexDirection: 'row', alignItems: "flex-end"}} onSubmit={onSubmitSearchUsers}>
                    <FormInput
                        labelText={lan.fullName}
                        id={"searchName"}
                        type={"text"}
                        required={true}
                        value={searchName}
                        onChange={setSearchName}
                        maxWidth={"100%"}
                    />
                    <Button>{lan.search}</Button>
                </FormBlock>
                <TableWithPagination
                    isLoading={users.isLoading}
                    dataSource={users.users}
                    columns={columns2}
                    fetchData={fetchData2}
                    saveCurrentPage={saveCurrentPageSettings2}
                    initialPage={chatUsersTableController.currentPage}
                    initialPageSize={chatUsersTableController.pageSize}
                    hasMore={users.hasMore}
                />
            </Block>
        </div>
    );
};

export default ChatList;