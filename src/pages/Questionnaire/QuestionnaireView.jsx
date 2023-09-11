import React, {useEffect, useState} from 'react';
import {clrs} from "../../constants/colors";
import FullLoading from "../../components/LoadingComponents/FullLoading";
import Block from "../../components/UI/Block/Block";
import {lan} from "../../constants/lan";
import Text from "../../components/UI/Text/Text";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getQuestionnaireById} from "../../store/slices/anketaSlice";
import {LocalName} from "../../utils/LocalName";
import FlexBlock from "../../components/UI/FlexBlock/FlexBlock";
import {v4 as uuidv4} from "uuid";
import FormInput from "../../components/Form/FormInput";
import {Checkbox, Radio, Space} from "antd";
import Button from "../../components/UI/Button/Button";
import {NotificationManager} from "react-notifications";
import BlockLoading from "../../components/LoadingComponents/BlockLoading";
import CompetenceService from "../../services/CompetenceService";
import error from "../../images/error_icon.svg";
import BigText from "../../components/UI/BigText/BigText";
import MyLink from "../../components/UI/MyLink/MyLink";
import Error from "../Error";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

const QuestionnaireView = () => {
    const {id} = useParams();

    const {questionnaire, isLoading} = useSelector(state => state.questionnaire);

    const {user} = useSelector(state => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQuestionnaireById({id: id}));
    }, [navigate]);

    if (isLoading) {
        return <FullLoading/>;
    }

    if (!user?.admin) {
        return <Error/>;
    }

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <Block>
                <Button type={2} onClick={() => {navigate('/admin/my')}}>{lan.back}</Button>
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{LocalName.getName(questionnaire)}</Text>
                <FlexBlock style={{
                    backgroundColor: clrs.white,
                    borderRadius: "15px",
                    width: "calc(100% - 30px)",
                    padding: "50px 15px",
                    flexDirection: "column",
                }}>
                    {
                        questionnaire.sections.map((section, i) => {
                            return (
                                <>
                                    <FlexBlock style={{
                                        backgroundColor: clrs.skin,
                                        borderRadius: "15px",
                                        width: "calc(100% - 30px)",
                                        padding: "15px",
                                        flexDirection: "column",
                                    }}>
                                        <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{section.name}</Text>
                                    </FlexBlock>
                                    {
                                        section.questionBankList.map((question, i) => {
                                            return (
                                                <>
                                                    <FlexBlock style={{
                                                        backgroundColor: clrs.whiter,
                                                        borderRadius: "5px",
                                                        width: "calc(100% - 20px)",
                                                        padding: "10px",
                                                        flexDirection: "column",
                                                        alignItems: "flex-start",
                                                        gap: "10px",
                                                    }}>
                                                        <Text normalWeight default>{(i + 1) + ") " + question.question}</Text>
                                                        {
                                                            question.type === 'LIST' &&
                                                            <Radio.Group
                                                                disabled={true}
                                                                >
                                                                <Space direction="vertical">
                                                                    {
                                                                        question.answerBankList.map((answer, i) => {
                                                                            return (
                                                                                <Radio style={{fontSize: "1rem"}} key={answer.id} value={answer.id}>{answer?.answer}</Radio>
                                                                            )
                                                                        })
                                                                    }
                                                                </Space>
                                                            </Radio.Group>
                                                        }
                                                        {
                                                            question.type === 'MCQ' &&
                                                            <Checkbox.Group
                                                                disabled={true}
                                                            >
                                                                <Space direction="vertical">
                                                                    {
                                                                        question.answerBankList.map((answer, i) => {
                                                                            return (
                                                                                <Checkbox style={{fontSize: "1rem"}} value={answer.id}>{answer.answer}</Checkbox>
                                                                            )
                                                                        })
                                                                    }
                                                                </Space>

                                                            </Checkbox.Group>
                                                        }
                                                    </FlexBlock>
                                                </>
                                            )
                                        })
                                    }
                                </>
                            )
                        })
                    }
                </FlexBlock>
            </Block>
        </div>
    );
};

export default QuestionnaireView;