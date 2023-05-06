import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Block from "../UI/Block/Block";
import {LocalName} from "../../utils/LocalName";
import Button from "../UI/Button/Button";
import FlexBlock from "../UI/FlexBlock/FlexBlock";
import HorizontalDivider from "../UI/Divider/HorizontalDivider";
import BlockLoading from "../LoadingComponents/BlockLoading";
import Text from "../UI/Text/Text";
import {lan} from "../../constants/lan";
import {deleteComponentById, deleteQuestionnaireById, getCompetenceBank} from "../../store/slices/competenceSlice";
import {NotificationContainer, NotificationManager} from "react-notifications";
import CompetenceService from "../../services/CompetenceService";

const CompetenceBank = () => {

    const {competenceBank, isLoading} = useSelector(state => state.competenceBank);
    const {errorDeleteComponent} = useSelector(state => state.competenceBank);

    const [loadingSelectedAnketa, setLoadingSelectedAnketa] = useState(false);

    const [selectedComponent, setSelectedComponent] = useState(null);

    const tabNum = useSelector(state => state.tabBlock.tabNum);

    const [selectedAnketa, setSelectedAnketa] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        setSelectedComponent(null);
        setSelectedAnketa(null);
    }, [tabNum])

    function selectComponent(component) {
        setSelectedComponent(component);
        setSelectedAnketa(null);
        console.log(component);
    }

    function selectAnketa(anketa) {
        setLoadingSelectedAnketa(true);
        CompetenceService.getQuestionnaireById(anketa.id)
            .then((r) => {
                setSelectedAnketa(r.data);
                console.log(r.data)
            })
            .finally(() => {
                setLoadingSelectedAnketa(false);
            })
    }

    useEffect(() => {
        if (errorDeleteComponent) {
            NotificationManager.error(lan.errorDeleteComponent);
        }
    }, [errorDeleteComponent])

    async function handleDeleteComponentById(id) {
        await dispatch(deleteComponentById({id: id}));
        await dispatch(getCompetenceBank());
        await setSelectedComponent(null);
        await setSelectedAnketa(null);
    }

    async function handleDeleteAnketaById(id) {
        await dispatch(deleteQuestionnaireById({id: id}));
        await dispatch(getCompetenceBank());
        await setSelectedComponent(null);
        await setSelectedAnketa(null);
    }

    return (
        <Block style={{padding: 0, gap: "20px"}}>
            <NotificationContainer/>
            <Text default>{lan.components}</Text>
            <BlockLoading isLoading={isLoading}/>
            <FlexBlock style={{flexWrap: "wrap", justifyContent: "flex-start"}}>
                {competenceBank?.componentBankList.map((component, i) => {
                    return <Button onClick={() => {selectComponent(component)}} key={component.id}>{LocalName.getName(component)}</Button>
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
                        <FlexBlock style={{flexWrap: "wrap", justifyContent: "flex-start"}}>
                            {
                                selectedComponent.questionnaireBankList.map((anketa, i) => {
                                    return <Button onClick={() => {selectAnketa(anketa)}} key={anketa.id}>{LocalName.getName(anketa)}</Button>
                                })
                            }
                        </FlexBlock>
                        <HorizontalDivider/>
                        <FlexBlock style={{flexDirection: "column", alignItems: "flex-start", gap: "20px"}}>
                            <BlockLoading isLoading={loadingSelectedAnketa}/>
                            {
                                selectedAnketa &&
                                <>
                                    <FlexBlock>
                                        <Text default>{LocalName.getName(selectedAnketa)}</Text>
                                    </FlexBlock>
                                    <Text onClick={() => {handleDeleteAnketaById(selectedAnketa.id)}} type={"button-black"}>{lan.deleteQuestionnaire}</Text>
                                    {
                                        selectedAnketa.sections.map(section => {
                                            return (
                                                <FlexBlock key={section.id} style={{
                                                    flexDirection: "column",
                                                    background: "#e7e7e7",
                                                    padding: "20px",
                                                    width: "calc(100% - 40px)",
                                                    borderRadius: "10px",
                                                    alignItems: "flex-start",
                                                }}>
                                                    <Text normalWeight default>{section.name}</Text>
                                                </FlexBlock>
                                            )
                                        })
                                    }
                                </>
                            }
                        </FlexBlock>
                    </>
                }
            </FlexBlock>


        </Block>
    );
};

export default CompetenceBank;