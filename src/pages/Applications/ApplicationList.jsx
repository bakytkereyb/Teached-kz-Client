import React, {useEffect, useState} from 'react';
import FlexBlock from "../../components/UI/FlexBlock/FlexBlock";
import {clrs} from "../../constants/colors";
import {useDispatch, useSelector} from "react-redux";
import TableWithPagination from "../../components/TableWithPagination/TableWithPagination";
import {useNavigate} from "react-router-dom";
import {changeCurrentPage} from "../../store/slices/tableController/ApplicationsTableController";
import {lan} from "../../constants/lan";
import Text from "../../components/UI/Text/Text";
import {getApplicationById, getMyApplications} from "../../store/slices/applicationSlice";

const ApplicationList = () => {

    const {myApplications, isLoadingMy, errorMy, hasMore} = useSelector(state => state.applications)
    const {currentPage, pageSize} = useSelector(state => state.applicationsTableController)
    const selectedApplication = useSelector(state => state.applications.application)
    const [applicationId, setApplicationId] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getApplicationById(applicationId))
    }, [applicationId])

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
                <Text normalWeight>{getStatusString(record?.status)}</Text>
            ),
            width: '20%',
        },
        {
            title: lan.actions,
            render: (_, record) => (
                <FlexBlock>
                    <Text onClick={() => setApplicationId(record.id)} type={"button"}>{lan.view}</Text>
                </FlexBlock>
            ),
            width: '10%',
        },
    ];

    function getStatusString(status) {
        if (status === 'APPROVED') {
            return lan.approved
        }
        if (status === 'NOT_APPROVED') {
            return lan.notApproved;
        }
        if (status === 'IN_PROGRESS') {
            return lan.inProgress;
        }
        if (status === 'UNDER_CONSIDERATION') {
            return lan.underConsideration;
        }
        return lan.awaiting
    }


    return (
        <>
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
            {applicationId &&
                <FlexBlock style={{
                    backgroundColor: clrs.whiter,
                    borderRadius: "15px",
                    padding: "30px",
                    width: "calc(100% - 60px)",
                    flexDirection: "column",
                    alignItems: "flex-start",
                }}>

                    <Text default normalWeight><b>{lan.title}:</b> {selectedApplication?.title}</Text>
                    <Text default normalWeight><b>{lan.body}:</b> {selectedApplication?.body}</Text>
                    <Text default normalWeight><b>{lan.status}:</b> {getStatusString(selectedApplication?.status)}
                    </Text>
                </FlexBlock>
            }
        </>

    );
};

export default ApplicationList;