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

const QuestionnairePass = () => {
    const {id} = useParams();

    const {questionnaire, isLoading} = useSelector(state => state.questionnaire);

    const [userAnswers, setUserAnswers] = useState(null);

    const [passLoading, setPassLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQuestionnaireById({id: id}));
    }, [navigate]);

    useEffect(() => {
        if (questionnaire !== null) {
            setAnswers();
        }
    }, [questionnaire])

    function handleOnChangeAnswer({question, answerId, text, selectedAnswers}) {
        setUserAnswers(userAnswers.map(userAnswer => {
            if (question.type === 'OPEN') {

            }
            if (question.type === 'LIST') {
                if (userAnswer.questionId === question.id) {
                    if (userAnswer.answerId === answerId) {
                        return {
                            "questionId": userAnswer.questionId,//LIST or MCQ
                            "answerId": userAnswer.answerId,
                            "answerText": userAnswer.answerText,
                            "isSelected": true,
                            "isChanged": true,
                        }
                    } else {
                        return {
                            "questionId": userAnswer.questionId,//LIST or MCQ
                            "answerId": userAnswer.answerId,
                            "answerText": userAnswer.answerText,
                            "isSelected": false,
                            "isChanged": true,
                        }
                    }
                }
            }
            if (question.type === 'MCQ') {
                if (userAnswer.questionId === question.id) {
                    if (selectedAnswers.includes(userAnswer.answerId)) {
                        return {
                            "questionId": userAnswer.questionId,//LIST or MCQ
                            "answerId": userAnswer.answerId,
                            "answerText": userAnswer.answerText,
                            "isSelected": true,
                            "isChanged": true,
                        }
                    } else {
                        return {
                            "questionId": userAnswer.questionId,//LIST or MCQ
                            "answerId": userAnswer.answerId,
                            "answerText": userAnswer.answerText,
                            "isSelected": false,
                            "isChanged": true,
                        }
                    }
                }
            }
            return userAnswer;
        }))
    }

    function setAnswers() {
        const answers = [];
        questionnaire.sections.map((section, i) => {
            section.questionBankList.map((question, i) => {
                question.answerBankList.map((answer, i) => {
                    if (question.type === 'OPEN') {
                        answers.push({
                            "questionId": question.id,//OPEN
                            "answerId": answer.id,
                            "answerText": "",
                            "isSelected": null,
                            "isChanged": false,
                        })
                    } else {
                        answers.push({
                            "questionId": question.id,//LIST or MCQ
                            "answerId": answer.id,
                            "answerText": null,
                            "isSelected": false,
                            "isChanged": false,
                        })
                    }

                })
            });
        });

        setUserAnswers(answers);
    }

    function handleOnSubmit() {
        try {
            setPassLoading(true);
            if (!userAnswers?.every(answer => answer.isChanged)) {
                throw new Error("Answer to all question!")
            }
            CompetenceService.passQuestionnaireById(id, userAnswers)
                .then(() => {
                    NotificationManager.success(lan.questionnairePassed);
                    navigate('/competence-map');
                })
                .catch(() => {
                    NotificationManager.error(lan.error);
                })

            // console.log(userAnswers);
        } catch (e) {
            NotificationManager.warning(lan.giveAnswersToAllQuestionsError);
            setPassLoading(false);
        }
    }

    if (isLoading) {
        return <FullLoading/>;
    }

    if (questionnaire.status === 'FINISHED') {
        return (
            <div>
                <Block style={{gap: '20px'}}>
                    <img src={error} alt="Error" style={{width: '100px', height: '100px'}}/>
                    <BigText>{lan.error}</BigText>
                    <Text style={{fontWeight: 400}}>{lan.problem}</Text>
                    <MyLink to={'/competence-bank'}>{lan.back}</MyLink>
                </Block>
            </div>
        )
    }

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <Block>
                <Button type={2} onClick={() => {navigate('/competence-bank')}}>{lan.back}</Button>
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{LocalName.getName(questionnaire)}</Text>
                <FlexBlock style={{
                    backgroundColor: clrs.white,
                    borderRadius: "15px",
                    width: "calc(100% - 30px)",
                    padding: "50px 15px",
                    flexDirection: "column",
                }}>
                    <BlockLoading isLoading={passLoading}/>
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
                                                            <Radio.Group onChange={(e) => {handleOnChangeAnswer({
                                                                question: question,
                                                                answerId: e.target.value
                                                            })}}>
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
                                                                onChange={(e) => {handleOnChangeAnswer({
                                                                    question: question,
                                                                    selectedAnswers: e,
                                                                })}}
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
                    <Button onClick={handleOnSubmit}>{lan.pass}</Button>
                </FlexBlock>
            </Block>
        </div>
    );
};

export default QuestionnairePass;