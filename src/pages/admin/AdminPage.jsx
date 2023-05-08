import React, {useEffect} from 'react';
import {clrs} from "../../constants/colors";
import HeaderPlatform from "../../components/HeaderPlatform/HeaderPlatform";
import Block from "../../components/UI/Block/Block";
import {lan} from "../../constants/lan";
import Text from "../../components/UI/Text/Text";
import TabBlock from "../../components/UI/TabBlock/TabBlock";
import TabItem from "../../components/UI/TabBlock/TabItem";
import CreateComponent from "./Competence/CreateComponent";
import {useDispatch, useSelector} from "react-redux";
import {getCompetenceBank} from "../../store/slices/competenceSlice";
import CompetenceBank from "./Competence/CompetenceBank";
import BlockLoading from "../../components/LoadingComponents/BlockLoading";
import CreateQuestionnaire from "./Competence/CreateQuestionnaire";
import {NotificationContainer} from "react-notifications";

const AdminPage = () => {

    const tabNum = useSelector(state => state.tabBlock.tabNum);
    const isLoadingCreateComponent = useSelector(state => state.competenceBank.isLoadingCreateComponent);
    const isLoadingCreateAnketa = useSelector(state => state.competenceBank.isLoadingCreateAnketa);
    const dispatch = useDispatch();

    useEffect(() => {
        if (tabNum === 0 || tabNum === 2) {
            dispatch(getCompetenceBank());
        }
    }, [tabNum])

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px"}}>
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.competenceBank}</Text>
                <TabBlock headers={[lan.competenceBank, lan.createComponentBank, lan.createAnketaBank]}>
                    <TabItem item={0}>
                        <CompetenceBank/>
                    </TabItem>
                    <TabItem item={1}>
                        <BlockLoading isLoading={isLoadingCreateComponent}/>
                        <Block style={{padding: 0}}>
                            <CreateComponent/>
                        </Block>
                    </TabItem>
                    <TabItem item={2}>
                        <BlockLoading isLoading={isLoadingCreateAnketa}/>
                        <Block style={{padding: 0}}>
                            <CreateQuestionnaire/>
                        </Block>
                    </TabItem>
                </TabBlock>
            </Block>
        </div>
    );
};

export default AdminPage;