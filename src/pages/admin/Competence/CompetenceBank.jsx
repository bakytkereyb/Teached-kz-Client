import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Block from "../../../components/UI/Block/Block";
import {LocalName} from "../../../utils/LocalName";
import Button from "../../../components/UI/Button/Button";
import FlexBlock from "../../../components/UI/FlexBlock/FlexBlock";
import HorizontalDivider from "../../../components/UI/Divider/HorizontalDivider";
import BlockLoading from "../../../components/LoadingComponents/BlockLoading";
import Text from "../../../components/UI/Text/Text";
import {lan} from "../../../constants/lan";
import {
    deleteComponentById,
    deleteQuestionnaireById,
    getCompetenceBank,
    resetError
} from "../../../store/slices/competenceSlice";
import {NotificationContainer, NotificationManager} from "react-notifications";
import CompetenceService from "../../../services/CompetenceService";
import {Table} from "antd";
import {useNavigate} from "react-router-dom";

const CompetenceBank = () => {

    const {competenceBank, isLoading} = useSelector(state => state.competenceBank);
    const {errorDeleteComponent, errorDeleteQuestionnaire} = useSelector(state => state.competenceBank);

    const [selectedComponent, setSelectedComponent] = useState(null);
    const [anketaList, setAnketaList] = useState(null);

    const tabNum = useSelector(state => state.tabBlock.tabNum);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setSelectedComponent(null);
        setAnketaList(null);
    }, [tabNum])

    function selectComponent(component) {
        setSelectedComponent(component);
        setAnketaList(component.questionnaireBankList);
        console.log(component);
    }

    useEffect(() => {
        if (errorDeleteQuestionnaire !== null) {
            NotificationManager.error(lan.errorDelete);
            dispatch(resetError())
        }
        if (errorDeleteComponent !== null) {
            NotificationManager.error(lan.errorDelete);
            dispatch(resetError())
        }
    }, [errorDeleteComponent, errorDeleteQuestionnaire])

    async function handleDeleteComponentById(id) {
        await dispatch(deleteComponentById({id: id}));
        await dispatch(getCompetenceBank());
        await setSelectedComponent(null);
        await setAnketaList(null);
    }

    async function handleDeleteAnketaById(id) {
        await dispatch(deleteQuestionnaireById({id: id}));
        await dispatch(getCompetenceBank());
        await setSelectedComponent(null);
        await setAnketaList(null);
    }

    const columns = [
        {
            title: lan.questionnaire,
            render: (_, record) => <Text>{LocalName.getName(record)}</Text>,
        },
        {
            title: lan.maxPoint,
            render: (_, record) => <Text>{record.maxPoint}</Text>,
            width: '10%',
        },
        {
            title: lan.actions,
            render: (_, record) => (
                <FlexBlock>
                    <Text onClick={() => {navigate(`/questionnaire/${record.id}/view`)}} type={"button"}>{lan.view}</Text>
                    <Text onClick={() => {handleDeleteAnketaById(record.id)}} type={"button-black"}>{lan.delete}</Text>
                </FlexBlock>
            ),
            width: '20%',
        },
    ];

    return (
        <Block style={{padding: 0, gap: "20px"}}>
            <Text default>{lan.components}</Text>
            <BlockLoading isLoading={isLoading}/>
            <FlexBlock style={{flexWrap: "wrap", justifyContent: "flex-start"}}>
                {competenceBank?.componentBankList.map((component, i) => {
                    return <Button type={selectedComponent?.id === component.id && 2} onClick={() => {selectComponent(component)}} key={component.id}>{LocalName.getName(component)}</Button>
                })}
            </FlexBlock>
            <HorizontalDivider/>
            <FlexBlock style={{flexDirection: "column", alignItems: "flex-start", gap: "20px"}}>
                {
                    selectedComponent &&
                    <>
                        <FlexBlock>
                            <Text default>{LocalName.getName(selectedComponent)}</Text>
                        </FlexBlock>
                        <Text onClick={() => {handleDeleteComponentById(selectedComponent.id)}} type={"button-black"}>{lan.deleteComponent}</Text>
                        <FlexBlock>
                            <Text default>{lan.questionnaires}</Text>
                        </FlexBlock>
                        <Table
                            style={{width: "100%"}}
                            columns={columns}
                            dataSource={anketaList}
                            bordered
                            rowKey={record => record.id}
                        />
                    </>
                }
            </FlexBlock>


        </Block>
    );
};

export default CompetenceBank;