import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Block from "../UI/Block/Block";
import {LocalName} from "../../utils/LocalName";
import Button from "../UI/Button/Button";
import FlexBlock from "../UI/FlexBlock/FlexBlock";
import HorizontalDivider from "../UI/Divider/HorizontalDivider";
import BlockLoading from "../LoadingComponents/BlockLoading";

const CompetenceBank = () => {

    const {competenceBank, isLoading} = useSelector(state => state.competenceBank);

    return (
        <Block style={{padding: 0, gap: "20px"}}>
            <BlockLoading isLoading={isLoading}/>
            <FlexBlock style={{flexWrap: "wrap", justifyContent: "flex-start"}}>
                {competenceBank?.componentBankList.map((component, i) => {
                    return <Button key={new Date() + i}>{LocalName.getName(component)}</Button>
                })}
            </FlexBlock>
            <HorizontalDivider/>
        </Block>
    );
};

export default CompetenceBank;