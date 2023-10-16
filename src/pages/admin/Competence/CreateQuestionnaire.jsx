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

    const [selectedCourse, setSelectedCourse] = useState({
        value: null,
        label: null
    });

    const dispatch = useDispatch();
    const {competenceBank, isLoading} = useSelector(state => state.competenceBank);
    const publicCourses = useSelector(state => state.adminPublicCourses);

    const [components, setComponents] = useState([]);
    const [courses, setCourses] = useState([]);

    const [sections, setSections] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    function onChangeSections(id, name) {
        setSections(
            sections.map(section => {
                if (section.id === id) {
                    return {
                        id: id,
                        name: name,
                        nameKz: section.nameKz,
                        nameRu: section.nameRu,
                    }
                }
                return section
            })
        )
    }

    function onChangeSectionsKz(id, nameKz) {
        setSections(
            sections.map(section => {
                if (section.id === id) {
                    return {
                        id: id,
                        name: section.name,
                        nameKz: nameKz,
                        nameRu: section.nameRu,
                    }
                }
                return section
            })
        )
    }

    function onChangeSectionsRu(id, nameRu) {
        setSections(
            sections.map(section => {
                if (section.id === id) {
                    return {
                        id: id,
                        name: section.name,
                        nameKz: section.nameKz,
                        nameRu: nameRu,
                    }
                }
                return section
            })
        )
    }

    function onChangeQuestion(id, questionText, questionKzText, questionRuText, type) {
        if (type !== null) {
            setQuestions(
                questions.map(question => {
                    if (question.id === id) {
                        return {
                            id: id,
                            questionText: question.questionText,
                            questionKzText: question.questionKzText,
                            questionRuText: question.questionRuText,
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
                            questionKzText: question.questionKzText,
                            questionRuText: question.questionRuText,
                            type: question.type,
                            sectionId: question.sectionId
                        }
                    }
                    return question
                })
            )
        }
        if (questionKzText !== null) {
            setQuestions(
                questions.map(question => {
                    if (question.id === id) {
                        return {
                            id: id,
                            questionText: question.questionText,
                            questionKzText: questionKzText,
                            questionRuText: question.questionRuText,
                            type: question.type,
                            sectionId: question.sectionId
                        }
                    }
                    return question
                })
            )
        }
        if (questionRuText !== null) {
            setQuestions(
                questions.map(question => {
                    if (question.id === id) {
                        return {
                            id: id,
                            questionText: question.questionText,
                            questionKzText: question.questionKzText,
                            questionRuText: questionRuText,
                            type: question.type,
                            sectionId: question.sectionId
                        }
                    }
                    return question
                })
            )
        }

    }

    function onChangeAnswer(id, answerText, answerKzText, answerRuText) {
        if (answerText !== null) {
            setAnswers(
                answers.map(answer => {
                    if (answer.id === id) {
                        return {
                            id: id,
                            answerText: answerText,
                            answerKzText: answer.answerKzText,
                            answerRuText: answer.answerRuText,
                            point: answer.point,
                            questionId: answer.questionId
                        }
                    }
                    return answer
                })
            )
        }
        if (answerKzText !== null) {
            setAnswers(
                answers.map(answer => {
                    if (answer.id === id) {
                        return {
                            id: id,
                            answerText: answer.answerText,
                            answerKzText: answerKzText,
                            answerRuText: answer.answerRuText,
                            point: answer.point,
                            questionId: answer.questionId
                        }
                    }
                    return answer
                })
            )
        }
        if (answerRuText !== null) {
            setAnswers(
                answers.map(answer => {
                    if (answer.id === id) {
                        return {
                            id: id,
                            answerText: answer.answerText,
                            answerKzText: answer.answerKzText,
                            answerRuText: answerRuText,
                            point: answer.point,
                            questionId: answer.questionId
                        }
                    }
                    return answer
                })
            )
        }
    }

    function onChangeAnswerPoint(id, point) {
        setAnswers(
            answers.map(answer => {
                if (answer.id === id) {
                    return {
                        id: id,
                        answerText: answer.answerText,
                        answerKzText: answer.answerKzText,
                        answerRuText: answer.answerRuText,
                        point: point,
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

    useEffect(() => {
        if (publicCourses.courses.length > 0) {
            setCourses(publicCourses.courses.map(item => {
                return {
                    value: item.id,
                    label: LocalName.getName(item)
                }
            }))
        }
    }, [publicCourses.courses])

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
            if (section.nameKz === '' || section.nameKz === undefined) {
                throw new Error("Incorrectly formed questionnaire")
            }
            if (section.nameRu === '' || section.nameRu === undefined) {
                throw new Error("Incorrectly formed questionnaire")
            }
        })
        questions.map((question) => {
            if (sections.find(item => item.id === question.sectionId)) {
                if (question.questionText === '' || question.questionText === undefined) {
                    throw new Error("Incorrectly formed questionnaire")
                }
                if (question.questionKzText === '' || question.questionKzText === undefined) {
                    throw new Error("Incorrectly formed questionnaire")
                }
                if (question.questionRuText === '' || question.questionRuText === undefined) {
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
                if (answer.answerKzText === '' || answer.answerKzText === undefined) {
                    throw new Error("Incorrectly formed questionnaire")
                }
                if (answer.answerRuText === '' || answer.answerRuText === undefined) {
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
                        "nameKz" : section.nameKz,
                        "nameRu" : section.nameRu,
                        "questions" : sectionsQuestions.map((question) => {
                            const questionAnswers = answers.filter(item => item.questionId === question.id);
                            return {
                                "question": question.questionText,
                                "questionKz": question.questionKzText,
                                "questionRu": question.questionRuText,
                                "type": question.type,
                                "answers" : question.type !== 'OPEN' ?
                                    questionAnswers.map((answer) => {
                                        return {
                                            "answer": answer.answerText,
                                            "answerKz": answer.answerKzText,
                                            "answerRu": answer.answerRuText,
                                            "point": answer.point
                                        }
                                    })
                                    :
                                    [{
                                        "answer": "OPEN",
                                        "point": 1.0
                                    }]
                            }
                        })
                    }
                }),
                "courseId": selectedCourse.value
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
            setSelectedCourse({
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
            name: '',
            nameKz: '',
            nameRu: '',
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
            questionKzText: '',
            questionRuText: '',
            type: '',
            sectionId: sectionId
        }]))
    }

    function addAnswer(questionId) {
        setAnswers(answers.concat([{
            id: uuidv4(),
            answerText: '',
            answerKzText: '',
            answerRuText: '',
            point: 0.0,
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
            <FormSelect
                labelText={lan.course}
                values={courses}
                onChange={setSelectedCourse}
                id={"selectedCourse"}
                required={false}
                maxWidth={"100%"}
                selectedValue={selectedCourse}
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
                            <FormInput
                                labelText={lan.sectionName + " KZ"}
                                value={section.nameKz}
                                onChange={(value) => {onChangeSectionsKz(section.id, value)}}
                                id={section.id + 1}
                                type={"text"}
                                required={true}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.sectionName + " RU"}
                                value={section.nameRu}
                                onChange={(value) => {onChangeSectionsRu(section.id, value)}}
                                id={section.id + 2}
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
                                                        onChange={(value) => {onChangeQuestion(question.id, value, null, null, null)}}
                                                        id={question.id}
                                                        type={"text"}
                                                        required={true}
                                                        maxWidth={"100%"}
                                                    />
                                                    <FormInput
                                                        labelText={lan.question + " KZ"}
                                                        value={question.questionKzText}
                                                        onChange={(value) => {onChangeQuestion(question.id, null, value, null, null)}}
                                                        id={question.id + 1}
                                                        type={"text"}
                                                        required={true}
                                                        maxWidth={"100%"}
                                                    />
                                                    <FormInput
                                                        labelText={lan.question + " RU"}
                                                        value={question.questionRuText}
                                                        onChange={(value) => {onChangeQuestion(question.id, null, null, value, null)}}
                                                        id={question.id + 2}
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
                                                        onChange={(value) => {onChangeQuestion(question.id, null, null, null, value.value)}}
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
                                                            <Text onClick={() => {addAnswer(question.id)}} type={'button-grey'}>{lan.addAnswer}</Text>
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
                                                                                <FormInput
                                                                                    labelText={lan.point}
                                                                                    value={answer.point}
                                                                                    onChange={(value) => {onChangeAnswerPoint(answer.id, value)}}
                                                                                    id={answer.id}
                                                                                    type={"number"}
                                                                                    required={true}
                                                                                    maxWidth={"10%"}
                                                                                />
                                                                                <FlexBlock style={{flexDirection: "column"}}>
                                                                                    <FormInput
                                                                                        labelText={lan.answer}
                                                                                        value={answer.answerText}
                                                                                        onChange={(value) => {onChangeAnswer(answer.id, value, null, null)}}
                                                                                        id={answer.id}
                                                                                        type={"text"}
                                                                                        required={true}
                                                                                        maxWidth={"100%"}
                                                                                    />
                                                                                    <FormInput
                                                                                        labelText={lan.answer + " KZ"}
                                                                                        value={answer.answerKzText}
                                                                                        onChange={(value) => {onChangeAnswer(answer.id, null, value, null)}}
                                                                                        id={answer.id + 1}
                                                                                        type={"text"}
                                                                                        required={true}
                                                                                        maxWidth={"100%"}
                                                                                    />
                                                                                    <FormInput
                                                                                        labelText={lan.answer + " RU"}
                                                                                        value={answer.answerRuText}
                                                                                        onChange={(value) => {onChangeAnswer(answer.id, null, null, value)}}
                                                                                        id={answer.id + 2}
                                                                                        type={"text"}
                                                                                        required={true}
                                                                                        maxWidth={"100%"}
                                                                                    />
                                                                                </FlexBlock>

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