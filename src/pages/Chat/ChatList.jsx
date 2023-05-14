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
import {getAllMyChats} from '../../store/slices/chat/chatsSlice';

const ChatList = () => {

    const {chats, hasMore, isLoading} = useSelector(state => state.chats)
    const {currentPage, pageSize} = useSelector(state => state.myChatsTableController);
    const [searchName, setSearchName] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(changeCurrentPage({ page: 1, limit: 5 }));
        dispatch(getAllMyChats({ page: 1, limit: 5 }));
    }, [navigate])

    const fetchData = async (params) => {
        return dispatch(getAllMyChats(params));
    };

    const saveCurrentPageSettings = (page, pageSize) => {
        dispatch(changeCurrentPage({page: page, pageSize: pageSize}));
    };

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

    async function onSubmitSearchUsers(e) {
        e.preventDefault();
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
                {/*<FormBlock style={{flexDirection: 'row', justifyContent: 'start'}} onSubmit={onSubmitSearchUsers}>*/}
                {/*    <FormInput*/}
                {/*        labelText={lan.fullName}*/}
                {/*        id={"searchName"}*/}
                {/*        type={"text"}*/}
                {/*        required={false}*/}
                {/*        value={searchName}*/}
                {/*        onChange={setSearchName}*/}
                {/*        maxWidth={"20%"}*/}
                {/*        withoutLabel={true}*/}
                {/*    />*/}
                {/*    <Button>Search</Button>*/}
                {/*</FormBlock>*/}
                {/*<TableWithPagination*/}
                {/*    isLoading={isLoading}*/}
                {/*    dataSource={users}*/}
                {/*    columns={columns}*/}
                {/*    fetchData={fetchData}*/}
                {/*    saveCurrentPage={saveCurrentPageSettings}*/}
                {/*    initialPage={currentPage}*/}
                {/*    initialPageSize={pageSize}*/}
                {/*    hasMore={hasMore}*/}
                {/*/>*/}
            </Block>
        </div>
    );
};

export default ChatList;