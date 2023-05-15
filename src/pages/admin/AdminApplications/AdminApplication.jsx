import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getAllApplications, updateApplication} from "../../../store/slices/admin/adminApplicationSlice";
import {changeCurrentPage} from "../../../store/slices/tableController/AdminApplicationsTableController";
import FlexBlock from "../../../components/UI/FlexBlock/FlexBlock";
import TableWithPagination from "../../../components/TableWithPagination/TableWithPagination";
import {clrs} from "../../../constants/colors";
import HeaderPlatform from "../../../components/HeaderPlatform/HeaderPlatform";
import Block from "../../../components/UI/Block/Block";
import {lan} from "../../../constants/lan";
import Text from "../../../components/UI/Text/Text";
import {getApplicationById} from "../../../store/slices/applicationSlice";
import Button from "../../../components/UI/Button/Button";
import FormSelect from "../../../components/Form/FormSelect";
import {NotificationManager} from "react-notifications";

const AdminApplication = () => {

    const {applications, isLoading, error, hasMore} = useSelector(state => state.adminApplications)
    const {currentPage, pageSize} = useSelector(state => state.adminApplicationsTableController)
    const selectedApplication = useSelector(state => state.applications.application)
    const [applicationId, setApplicationId] = useState(null);
    const [applicationStatus, setApplicationStatus] = useState({
        value: null,
        label: null
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getAllApplications({page: 1, limit: 5}));
    }, [navigate])

    useEffect(() => {
        dispatch(getApplicationById(applicationId))
        setApplicationStatus({
            value: selectedApplication?.status,
            label: selectedApplication?.status
        })
    }, [applicationId])


    const fetchData = async (params) => {
        return dispatch(getAllApplications(params));
    }
    const saveCurrentPageSettings = (page, pageSize) => {
        dispatch(changeCurrentPage({page: page, pageSize: pageSize}));
    };

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


    const columns = [
        {
            title: lan.fullName,
            render: (_, record) => <Text normalWeight>{record.user.fullName} <b>({record.user.username})</b></Text>,
            width: '20%'
        },
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
                <Text normalWeight>{getStatusString(record.status)}</Text>
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

    async function handleOnSubmit(e) {
        e.preventDefault();
        if(applicationStatus && selectedApplication) {
            await dispatch(updateApplication({id: selectedApplication?.id, status: applicationStatus.value}))
            NotificationManager.success(lan.statusChanged);
            dispatch(getAllApplications({page: currentPage, limit: 5}));
            dispatch(getApplicationById(selectedApplication?.id))
        }
    }

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px"}}>
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.applications}</Text>
                <FlexBlock style={{
                    backgroundColor: clrs.white,
                    borderRadius: "15px",
                    padding: "20px",
                    width: "calc(100% - 40px)",
                }}>
                    <TableWithPagination
                        isLoading={isLoading}
                        dataSource={applications}
                        columns={columns}
                        fetchData={fetchData}
                        saveCurrentPage={saveCurrentPageSettings}
                        initialPage={currentPage}
                        initialPageSize={pageSize}
                        hasMore={hasMore}
                    />
                </FlexBlock>
                {applicationId &&
                    <FlexBlock style={{
                        backgroundColor: clrs.white,
                        borderRadius: "15px",
                        padding: "30px",
                        width: "calc(100% - 60px)",
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}>
                        <FlexBlock style={{
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}>
                            <Text default normalWeight><b>{lan.selectedStudent}:</b> {selectedApplication?.user.fullName}
                            </Text>
                            <Text onClick={() => {
                                navigate(`/profile/${selectedApplication?.user.username}`)
                            }} type={"button"}>{lan.profile}</Text>
                        </FlexBlock>

                        <Text default normalWeight><b>{lan.title}:</b> {selectedApplication?.title}</Text>
                        <Text default normalWeight><b>{lan.body}:</b> {selectedApplication?.body}</Text>
                        <Text default normalWeight><b>{lan.status}:</b> {getStatusString(selectedApplication?.status)}</Text>
                        <FormSelect
                            labelText={lan.status}
                            values={[
                                {
                                    value: "AWAITING",
                                    label: "Awaiting"
                                },
                                {
                                    value: "APPROVED",
                                    label: "Approved"
                                },
                                {
                                    value: "NOT_APPROVED",
                                    label: "Not approved"
                                },
                                {
                                    value: "IN_PROGRESS",
                                    label: "In progress"
                                },
                                {
                                    value: "UNDER_CONSIDERATION",
                                    label: "Under consideration"
                                },
                            ]}
                            onChange={setApplicationStatus}
                            id={"applicationStatus"}
                            required={true}
                            maxWidth={"50%"}
                            withoutLabel={true}
                            selectedValue={applicationStatus}
                        />
                        <Button onClick={handleOnSubmit}>{lan.changeStatus}</Button>
                    </FlexBlock>
                }
            </Block>
        </div>
    );
};

export default AdminApplication;