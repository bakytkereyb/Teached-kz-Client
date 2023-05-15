import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clrs} from "../../constants/colors";
import HeaderPlatform from "../../components/HeaderPlatform/HeaderPlatform";
import Block from "../../components/UI/Block/Block";
import Text from "../../components/UI/Text/Text";
import {lan} from "../../constants/lan";
import TabBlock from "../../components/UI/TabBlock/TabBlock";
import TabItem from "../../components/UI/TabBlock/TabItem";
import CreateApplication from "./CreateApplication";
import ApplicationList from "./ApplicationList";
import {getMyApplications} from "../../store/slices/applicationSlice";

const Application = () => {
    const tabNum = useSelector(state => state.tabBlock.tabNum);
    const dispatch = useDispatch();

    useEffect(() => {
        if (tabNum === 1) {
            dispatch(getMyApplications({page: 1, limit: 5}))
        }
    }, [tabNum])
    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px"}}>
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.applications}</Text>
                <TabBlock headers={[lan.createApplication, lan.applicationList]}>
                    <TabItem item={0}>
                        <CreateApplication/>
                    </TabItem>
                    <TabItem item={1}>
                        <Block style={{padding: 0}}>
                            <ApplicationList/>
                        </Block>
                    </TabItem>
                </TabBlock>
            </Block>
        </div>
    );
};

export default Application;