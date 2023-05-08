import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setTab} from "../../../store/slices/tabBlock/tabBlockSlice";
import FormInput from "../../../components/Form/FormInput";
import {lan} from "../../../constants/lan";
import Button from "../../../components/UI/Button/Button";
import FormBlock from "../../../components/Form/FormBlock";
import FormSelect from "../../../components/Form/FormSelect";
import {LocalName} from "../../../utils/LocalName";
import HorizontalDivider from "../../../components/UI/Divider/HorizontalDivider";
import Text from "../../../components/UI/Text/Text";
import FlexBlock from "../../../components/UI/FlexBlock/FlexBlock";
import { v4 as uuidv4 } from 'uuid';
import {clrs} from "../../../constants/colors";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {createAnketaBank} from "../../../store/slices/competenceSlice";

const CreateQuestionnaire = () => {
    const [nameEng, setNameEng] = useState('');
    const [nameKz, setNameKz] = useState('');
    const [nameRu, setNameRu] = useState('');

    const [selectedComponent, setSelectedComponent] = useState({
        value: null,
        label: null
    });

    const dispatch = useDispatch();
    const {competenceBank, isLoading} = useSelector(state => state.competenceBank);

    const [components, setComponents] = useState([]);

    const [sections, setSections] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    function onChangeSections(id, name) {
        setSections(
            sections.map(section => {
                if (section.id === id) {
                    return {
                        id: id,
                        name: name
                    }
                }
                return section
            })
        )
    }

    function onChangeQuestion(id, questionText, type) {
        if (type !== null) {
            setQuestions(
                questions.map(question => {
                    if (question.id === id) {
                        return {
                            id: id,
                            questionText: question.questionText,
                            type: type,
                            sectionId: question.sectionId
                        }
                    }
                    return question
                })
            )
        }
        if (questionText !== null) {
            setQuestions(
                questions.map(question => {
                    if (question.id === id) {
                        return {
                            id: id,
                            questionText: questionText,
                            type: question.type,
                            sectionId: question.sectionId
                        }
                    }
                    return question
                })
            )
        }
    }

    function onChangeAnswer(id, answerText) {
        setAnswers(
            answers.map(answer => {
                if (answer.id === id) {
                    return {
                        id: id,
                        answerText: answerText,
                        isCorrect: answer.isCorrect,
                        questionId: answer.questionId
                    }
                }
                return answer
            })
        )
    }

    useEffect(() => {
        if (competenceBank) {
            setComponents(competenceBank?.componentBankList.map(item => {
                return {
                    value: item.id,
                    label: LocalName.getName(item)
                }
            }));
        }

    }, [competenceBank]);

    function validateForm() {
        if (!selectedComponent.value && !selectedComponent.label) {
            throw new Error("Incorrectly formed questionnaire")
        }
        if (!nameEng) {
            throw new Error("Incorrectly formed questionnaire")
        }
        if (!nameRu) {
            throw new Error("Incorrectly formed questionnaire")
        }
        if (!nameKz) {
            throw new Error("Incorrectly formed questionnaire")
        }

        if (sections.length === 0) {
            throw new Error("Incorrectly formed questionnaire")
        }
        if (questions.length === 0) {
            throw new Error("Incorrectly formed questionnaire")
        }
        sections.map((section) => {
            if (section.name === '' || section.name === undefined) {
                throw new Error("Incorrectly formed questionnaire")
            }
        })
        questions.map((question) => {
            if (sections.find(item => item.id === question.sectionId)) {
                if (question.questionText === '' || question.questionText === undefined) {
                    throw new Error("Incorrectly formed questionnaire")
                }
                if (question.type !== 'OPEN') {
                    if (question.type === '' || question.type === undefined) {
                        throw new Error("Incorrectly formed questionnaire")
                    }
                    if (!answers.some(item => item.questionId === question.id)) {
                        throw new Error("Incorrectly formed questionnaire")
                    }
                }
            }
        })
        answers.map((answer) => {
            if (questions.find(item => item.id === answer.questionId && item.type !== 'OPEN')) {
                if (answer.answerText === '' || answer.answerText === undefined) {
                    throw new Error("Incorrectly formed questionnaire")
                }
            }
        })
    }

    async function handleOnSubmit(e) {
        try {
            e.preventDefault();
            await validateForm();
            const data = {
                "name": nameEng,
                "nameKz": nameKz,
                "nameRu": nameRu,
                "sections": sections.map((section) => {
                    const sectionsQuestions = questions.filter(item => item.sectionId === section.id);
                    return {
                        "name" : section.name,
                        "questions" : sectionsQuestions.map((question) => {
                            const questionAnswers = answers.filter(item => item.questionId === question.id);
                            return {
                                "question": question.questionText,
                                "type": question.type,
                                "answers" : question.type !== 'OPEN' ?
                                    questionAnswers.map((answer) => {
                                        return {
                                            "answer": answer.answerText,
                                            "isCorrect": answer.isCorrect
                                        }
                                    })
                                    :
                                    [{
                                        "answer": "OPEN",
                                        "isCorrect": true
                                    }]
                            }
                        })
                    }
                })
            }

            console.log(data)
            const componentId = selectedComponent.value;
            await dispatch(createAnketaBank({data: data, componentId: componentId}));
            await dispatch(setTab(0));
            setNameEng('');
            setNameKz('');
            setNameRu('');
            setSections([]);
            setQuestions([]);
            setAnswers([]);
            setSelectedComponent({
                value: null,
                label: null
            });
        } catch (e) {
            NotificationManager.error(lan.createAnketaFormValidationError);
        }

        // dispatch(setTab(0));
    }

    function addSection() {
        setSections(sections.concat([{
            id: uuidv4(),
            name: ''
        }]))
    }

    function deleteSection(id) {
        setSections(sections.filter(item => item.id !== id))
    }

    function deleteQuestion(id) {
        setQuestions(questions.filter(item => item.id !== id))
    }

    function deleteAnswer(id) {
        setAnswers(answers.filter(item => item.id !== id))
    }

    function addQuestion(sectionId) {
        setQuestions(questions.concat([{
            id: uuidv4(),
            questionText: '',
            type: '',
            sectionId: sectionId
        }]))
    }

    function addAnswer(questionId, isCorrect) {
        setAnswers(answers.concat([{
            id: uuidv4(),
            answerText: '',
            isCorrect: isCorrect,
            questionId: questionId
        }]))
    }


    return (
        <FormBlock style={{alignItems:"flex-start"}} onSubmit={handleOnSubmit}>
            <FormSelect
                labelText={lan.chooseComponent}
                values={components}
                onChange={setSelectedComponent}
                id={"selectedComponent"}
                required={true}
                maxWidth={"100%"}
                selectedValue={selectedComponent}
            />
            <FormInput
                labelText={lan.nameEng}
                value={nameEng}
                onChange={setNameEng}
                id={"nameEng"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <FormInput
                labelText={lan.nameKz}
                value={nameKz}
                onChange={setNameKz}
                id={"nameKz"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <FormInput
                labelText={lan.nameRu}
                value={nameRu}
                onChange={setNameRu}
                id={"nameRu"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            {
                sections.map((section, i) => {
                    return (
                        <FlexBlock key={section.id} style={{
                            flexDirection: "column",
                            background: "#e7e7e7",
                            padding: "20px",
                            width: "calc(100% - 40px)",
                            borderRadius: "10px",
                            alignItems: "flex-start",
                            gap: "25px"
                        }}>
                            <Text onClick={() => {deleteSection(section.id)}} type={'button-black'}>{lan.delete}</Text>
                            <FormInput
                                labelText={lan.sectionName}
                                value={section.name}
                                onChange={(value) => {onChangeSections(section.id, value)}}
                                id={section.id}
                                type={"text"}
                                required={true}
                                maxWidth={"100%"}
                            />
                                {
                                    questions.map((question, i) => {
                                        if (question.sectionId === section.id) {
                                            return (
                                                <FlexBlock key={question.id} style={{
                                                    flexDirection: "column",
                                                    background: "#f5f5f5",
                                                    padding: "20px",
                                                    width: "calc(100% - 40px)",
                                                    borderRadius: "10px",
                                                    alignItems: "flex-start",
                                                    gap: "25px"
                                                }}>
                                                    <Text onClick={() => {deleteQuestion(question.id)}} type={'button-black'}>{lan.delete}</Text>
                                                    <FormInput
                                                        labelText={lan.question}
                                                        value={question.questionText}
                                                        onChange={(value) => {onChangeQuestion(question.id, value, null)}}
                                                        id={question.id}
                                                        type={"text"}
                                                        required={true}
                                                        maxWidth={"100%"}
                                                    />
                                                    <FormSelect
                                                        labelText={lan.questionType}
                                                        values={[
                                                            {
                                                                value: 'LIST',
                                                                label: 'LIST'
                                                            },
                                                            {
                                                                value: 'MCQ',
                                                                label: 'MCQ'
                                                            },
                                                            // {
                                                            //     value: 'OPEN',
                                                            //     label: 'OPEN'
                                                            // }
                                                        ]}
                                                        onChange={(value) => {onChangeQuestion(question.id, null, value.value)}}
                                                        id={question.id + 1}
                                                        required={true}
                                                        maxWidth={"100%"}
                                                        selectedValue={{
                                                            value: questions.find(item => item.id === question.id).type,
                                                            label: questions.find(item => item.id === question.id).type
                                                        }}
                                                    />
                                                    {
                                                        question.type !== 'OPEN' && question.type !== '' &&
                                                        <FlexBlock style={{
                                                            flexWrap: "wrap"
                                                        }}>
                                                            <Text onClick={() => {addAnswer(question.id, true)}} type={'button-green'}>{lan.addCorrectAnswer}</Text>
                                                            <Text onClick={() => {addAnswer(question.id, false)}} type={'button-red'}>{lan.addInCorrectAnswer}</Text>
                                                        </FlexBlock>
                                                    }

                                                    {
                                                        question.type !== 'OPEN' && question.type !== '' &&
                                                        <FlexBlock style={{
                                                            flexDirection: "column",
                                                            background: "#e3e3e3",
                                                            padding: "20px",
                                                            width: "calc(100% - 40px)",
                                                            borderRadius: "10px",
                                                            alignItems: "flex-start",
                                                            gap: "25px"
                                                        }}>
                                                            {
                                                                answers.map(answer => {
                                                                    if (answer.questionId === question.id) {
                                                                        return (
                                                                            <FlexBlock key={answer.id}>
                                                                                <div style={{
                                                                                    backgroundColor: answer.isCorrect ? clrs.green : clrs.red,
                                                                                    width: "25px",
                                                                                    height: "25px"
                                                                                }}/>
                                                                                <FormInput
                                                                                    labelText={lan.answer}
                                                                                    value={answer.answerText}
                                                                                    onChange={(value) => {onChangeAnswer(answer.id, value)}}
                                                                                    id={answer.id}
                                                                                    type={"text"}
                                                                                    required={true}
                                                                                    maxWidth={"100%"}
                                                                                />
                                                                                <Text onClick={() => {deleteAnswer(answer.id)}} type={'button-black'}>{lan.delete}</Text>
                                                                            </FlexBlock>
                                                                        )
                                                                    }

                                                                })
                                                            }
                                                        </FlexBlock>
                                                    }

                                                </FlexBlock>
                                            )
                                        }
                                    })
                                }
                            <Text onClick={() => {addQuestion(section.id)}} type={'button'}>{lan.addQuestion}</Text>
                        </FlexBlock>
                    )
                })
            }

            <Text onClick={addSection} type={'button'}>{lan.addSection}</Text>
            <Button onClick={handleOnSubmit}>{lan.create}</Button>
        </FormBlock>
    );
};

export default CreateQuestionnaire;