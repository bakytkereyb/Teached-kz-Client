import React, {useEffect, useState} from 'react';
import Chart from 'react-apexcharts';
import {clrs} from '../../../constants/colors';
import Text from '../../../components/UI/Text/Text';
import {lan} from '../../../constants/lan';
import FlexBlock from '../../../components/UI/FlexBlock/FlexBlock';
import classes from './analytics.module.css';
import {useSelector} from 'react-redux';
import Card from '../../../components/LoadingComponents/Card';
import Button from '../../../components/UI/Button/Button';
import {LocalName} from '../../../utils/LocalName';
import HorizontalDivider from '../../../components/UI/Divider/HorizontalDivider';

const CompetenceAnalytics = () => {

    const {analytics, isLoading} = useSelector(state => state.analytics.competenceBank);
    const userAnalytics = useSelector(state => state.analytics.users);


    useEffect(() => {
        console.log(analytics);
    }, [analytics]);

    const [selectedComponent, setSelectedComponent] = useState(null);

    const [config, setConfig] = useState(
        {
            options: {
                title: {
                    text: lan.numOfPassedUsersByQuestionnaires,
                },
                labels: [lan.empty],
                stroke: {
                    colors: ['#fff']
                },
                fill: {
                    opacity: 0.8
                },
                yaxis: {
                    max:userAnalytics ? userAnalytics?.analytics?.total : 100,
                    min:0,
                },
            },

            series: [0],
        }
    )

    function selectComponent(component) {
        const questionnaires = component.questionnaires;
        if (questionnaires.length > 0) {
            setConfig({
                options: {
                    title: {
                        text: lan.numOfPassedUsersByQuestionnaires,
                    },
                    labels: questionnaires.map(questionnaire => {return LocalName.getName(questionnaire)}),
                    stroke: {
                        colors: ['#fff']
                    },
                    fill: {
                        opacity: 0.8
                    },
                    yaxis: {
                        max:userAnalytics ? userAnalytics?.analytics?.total : 100,
                        min:0,
                    },
                },

                series: questionnaires.map(questionnaire => {return questionnaire.numOfPassedUsers}),
            });
        } else {
            setConfig({
                options: {
                    title: {
                        text: lan.numOfPassedUsersByQuestionnaires,
                    },
                    labels: [lan.empty],
                    stroke: {
                        colors: ['#fff']
                    },
                    fill: {
                        opacity: 0.8
                    },
                    yaxis: {
                        max:userAnalytics ? userAnalytics?.analytics?.total : 100,
                        min:0,
                    },
                },

                series: [0],
            })
        }
        setSelectedComponent(component)
    }

    const tabNum = useSelector(state => state.tabBlock.tabNum)

    useEffect(() => {
        setSelectedComponent(null);
        setConfig({
            options: {
                labels: [lan.empty],
                stroke: {
                    colors: ['#fff']
                },
                fill: {
                    opacity: 0.8
                },
                yaxis: {
                    max:userAnalytics ? userAnalytics?.analytics?.total : 100,
                    min:0,
                },
            },

            series: [0],
        });
    }, [tabNum]);

    if (isLoading) {
        return (
            <Card type={"horizontal-big"}/>
        );
    }

    return (
        <FlexBlock style={{flexDirection: "column", alignItems: "flex-start"}}>
            <Text default>{lan.components} :</Text>
            <FlexBlock style={{flexWrap: "wrap", justifyContent: "flex-start"}}>
                {analytics?.components.map((component, i) => {
                    return <Button type={selectedComponent?.id === component.id && 2} onClick={() => {selectComponent(component)}} key={component.id}>{LocalName.getName(component)}</Button>
                })}
            </FlexBlock>
            <HorizontalDivider/>
            {
                selectedComponent &&
                <FlexBlock>
                    <Chart
                        options={config.options}
                        series={config.series}
                        type="polarArea"
                        className={classes.myPie}
                    />
                </FlexBlock>
            }
        </FlexBlock>
    );
};

export default CompetenceAnalytics;