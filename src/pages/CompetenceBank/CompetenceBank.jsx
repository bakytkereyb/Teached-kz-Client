import React, {useEffect, useState} from 'react';
import {clrs} from "../../constants/colors";
import HeaderPlatform from "../../components/HeaderPlatform/HeaderPlatform";
import Block from "../../components/UI/Block/Block";
import Text from "../../components/UI/Text/Text";
import {lan} from "../../constants/lan";
import FlexBlock from "../../components/UI/FlexBlock/FlexBlock";
import {useDispatch, useSelector} from "react-redux";
import Alert from "../../components/UI/Alert/Alert";
import Card from "../../components/LoadingComponents/Card";
import {useNavigate} from "react-router-dom";
import {getCompetenceBank} from "../../store/slices/competenceSlice";
import BlockLoading from "../../components/LoadingComponents/BlockLoading";
import Button from "../../components/UI/Button/Button";
import {LocalName} from "../../utils/LocalName";
import HorizontalDivider from "../../components/UI/Divider/HorizontalDivider";
import {Badge, Space, Table, Tag} from "antd";

const CompetenceBank = () => {
    const {competenceBank, isLoading} = useSelector(state => state.competenceBank);

    const [selectedComponent, setSelectedComponent] = useState(null);
    const [anketaList, setAnketaList] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCompetenceBank());
    }, [navigate])

    function selectComponent(component) {
        setSelectedComponent(component);
        setAnketaList(component.questionnaireBankList);
        console.log(component)
    }

    if (isLoading) {
        return (
            <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
                <HeaderPlatform/>
                <Block style={{marginTop: "50px", alignItems: "flex-start"}}>
                    <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.competenceBank}</Text>
                    <Card type={"horizontal"}/>
                </Block>
            </div>
        );
    }

    const columns = [
        {
            title: lan.questionnaire,
            render: (_, record) => <Text>{LocalName.getName(record)}</Text>,
        },
        {
            title: lan.recommendation,
            render: (_, record) => (
                record?.course !== null &&
                <Text normalWeight>{lan.weRecommend} "{LocalName.getName(record?.course)}"</Text>
            ),
            width: '15%',
        },
        {
            title: lan.status,
            render: (_, record) => (
                record.status === 'FINISHED' ?
                    <Badge status="success" text={lan.passed}/>
                    :
                    <Badge status="default" text={lan.notPassed}/>
            ),
            width: '10%',
        },
        {
            title: lan.point,
            render: (_, record) => (
                <Text>{record.point ? Number((record.point).toFixed(2)) + " / " + record.maxPoint : "-" + " / " + record.maxPoint}</Text>
            ),
            width: '10%',
        },
        {
            title: lan.actions,
            render: (_, record) => (
                <FlexBlock>
                    {
                        record.point ?
                            ''
                            // <Text onClick={() => {navigate(`/questionnaire/${record.id}/view`)}} type={"button"}>{lan.view}</Text>
                            :
                            <Text onClick={() => {window.open(`/questionnaire/${record.id}/pass`, '_blank')}} type={"button-red"}>{lan.pass}</Text>
                    }
                </FlexBlock>
            ),
            width: '10%',
        },
    ];

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px", alignItems: "flex-start"}}>
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.competenceBank}</Text>
                <FlexBlock style={{
                    backgroundColor: clrs.white,
                    borderRadius: "15px",
                    width: "calc(100% - 30px)",
                    padding: "50px 15px",
                    flexDirection: "column",
                }}>
                    <Text default>{lan.components}</Text>
                    <FlexBlock style={{flexWrap: "wrap", justifyContent: "flex-start"}}>
                        {competenceBank?.componentBankList.map((component, i) => {
                            return <Button type={selectedComponent?.id === component.id && 2} onClick={() => {selectComponent(component)}} key={new Date() + component.id + "_" + i}>{LocalName.getName(component)}</Button>
                        })}
                    </FlexBlock>
                    <HorizontalDivider/>

                    {
                        selectedComponent &&
                        <>
                            <Text default>{lan.questionnaires}</Text>
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
        </div>
    );
};

export default CompetenceBank;