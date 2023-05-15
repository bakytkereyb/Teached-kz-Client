import React, {useEffect} from 'react';
import FlexBlock from "../../components/UI/FlexBlock/FlexBlock";
import {clrs} from "../../constants/colors";
import {useDispatch, useSelector} from "react-redux";
import TableWithPagination from "../../components/TableWithPagination/TableWithPagination";
import {useNavigate} from "react-router-dom";
import {changeCurrentPage} from "../../store/slices/tableController/ApplicationsTableController";
import {lan} from "../../constants/lan";
import Text from "../../components/UI/Text/Text";
import {getMyApplications} from "../../store/slices/applicationSlice";

const ApplicationList = () => {

    const {myApplications, isLoadingMy, errorMy, hasMore} = useSelector(state => state.applications)
    const {currentPage, pageSize} = useSelector(state => state.applicationsTableController)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchData = async (params) => {
        return dispatch(getMyApplications(params));
    }
    const saveCurrentPageSettings = (page, pageSize) => {
        dispatch(changeCurrentPage({page: page, pageSize: pageSize}));
    };

    const columns = [
        {
            title: lan.title,
            render: (_, record) => (
                <Text normalWeight>{record.title}</Text>
            ),
            width: '20%',
        },
        {
            title: lan.status,
            render: (_, record) => (
                <Text normalWeight>{record.status}</Text>
            ),
            width: '20%',
        },
        {
            title: lan.actions,
            render: (_, record) => (
                <FlexBlock>
                    <Text onClick={() => {
                        navigate(`/chat/${record.id}`)
                    }} type={"button"}>{lan.view}</Text>
                </FlexBlock>
            ),
            width: '10%',
        },
    ];

    return (
            <TableWithPagination
                isLoading={isLoadingMy}
                dataSource={myApplications}
                columns={columns}
                fetchData={fetchData}
                saveCurrentPage={saveCurrentPageSettings}
                initialPage={currentPage}
                initialPageSize={pageSize}
                hasMore={hasMore}
            />
    );
};

export default ApplicationList;