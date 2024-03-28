import React, {useEffect, useState} from 'react';
import {clrs} from "../../constants/colors";
import HeaderPlatform from "../../components/HeaderPlatform/HeaderPlatform";
import Block from "../../components/UI/Block/Block";
import Chart from "react-apexcharts";
import {lan} from "../../constants/lan";
import Text from "../../components/UI/Text/Text";
import FlexBlock from "../../components/UI/FlexBlock/FlexBlock";
import Alert from "../../components/UI/Alert/Alert";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCompetenceBank} from "../../store/slices/competenceSlice";
import Card from "../../components/LoadingComponents/Card";
import {LocalName} from "../../utils/LocalName";
import Button from "../../components/UI/Button/Button";
import classes from './competence.module.css';
import Tooltip from "./Tooltip";
import ReactDOMServer from 'react-dom/server';
import {Card as AntdCard} from 'antd';


const CompetenceMap = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {competenceBank, isLoading} = useSelector(state => state.competenceBank);

    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    const [realData, setRealData] = useState([]);
    const [dataRequired, setDataRequired] = useState([]);


    useEffect(() => {
        dispatch(getCompetenceBank());
    }, [navigate])

    useEffect(() => {
        if (competenceBank !== null) {
            setLabels(competenceBank.componentBankList.map(component => {
                return LocalName.getName(component);
            }))
            // setData(competenceBank.componentBankList.map(component => {
            //     if (component.maxPoint === 0.0) {
            //         return 0;
            //     }
            //     return Number((component.averagePoint / component.maxPoint * 100).toFixed(2));
            // }));
            // setRealData(competenceBank.componentBankList.map(component => {
            //     if (component.maxPoint === 0.0) {
            //         return 0;
            //     }
            //     return Number(component.averagePoint);
            // }));
            setData(competenceBank.componentBankList.map(component => {
                if (component.maxPoint === 0.0) {
                    return 0;
                }
                return Number(component.averagePoint);
            }));
            setRealData(competenceBank.componentBankList.map(component => {
                if (component.maxPoint === 0.0) {
                    return 0;
                }
                if (component.nameRu === "Дидактический") {
                    return Number(component.averagePoint);
                }
                if (component.nameRu === "Проектировочный") {
                    return Number(component.averagePoint) * 1.2;
                }
                if (component.nameRu === "Мониторинговый") {
                    return Number(component.averagePoint);
                }
                if (component.nameRu === "Личностный") {
                    return Number(component.averagePoint) * 0.8;
                }
                return Number(component.averagePoint);
            }));

            // setDataRequired(competenceBank.componentBankList.map(component => {
            //     return 100;
            // }));
            console.log(competenceBank)
        }
    }, [competenceBank])

    const config2 = {
        options: {

            plotOptions: {

                bar: {
                    borderRadius: 4,
                    horizontal: true,
                    barHeight: "30%",
                }
            },
            colors: [clrs.red],
            labels: labels,
            yaxis: {
                max:20,
                min:0,
                labels: {
                    style: {
                        colors: ["#000000", "#000000","#000000", "#000000", "#000000","#000000"],
                        fontSize: '15px',
                        fontFamily: 'Montserrat, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
            },
            xaxis: {
                tickAmount: 10,
                labels: {
                    style: {
                        colors: [],
                        fontSize: '15px',
                        fontFamily: 'Montserrat, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
            },
            tooltip: {
                custom: function({series, seriesIndex, dataPointIndex, w}) {
                    // var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                    //
                    // console.log("_________")
                    // console.log(competenceBank.componentBankList[dataPointIndex]);
                    // console.log(series)
                    // console.log(seriesIndex)
                    // console.log(dataPointIndex) // index
                    // console.log(w)

                    let level = '';
                    const averagePoint = competenceBank.componentBankList[dataPointIndex].averagePoint;
                    // const maxPoint = competenceBank.componentBankList[dataPointIndex].maxPoint;
                    // const percent = (averagePoint / maxPoint) * 100;
                    if (averagePoint <= 5) {
                        level = lan.zeroLevel;
                    }
                    if (averagePoint > 5 && averagePoint < 11) {
                        level = lan.situationalLevel;
                    }
                    if (averagePoint >= 11 && averagePoint < 15) {
                        level = lan.developingLevel;
                    }
                    if (averagePoint >= 15 && averagePoint < 19) {
                        level = lan.advancedLevel;
                    }
                    if (averagePoint >= 19) {
                        level = lan.expertLevel;
                    }
                    let averageLevel = competenceBank.componentBankList[dataPointIndex].averagePoint;
                    let maxLevel = competenceBank.componentBankList[dataPointIndex].maxPoint;
                    if (competenceBank.componentBankList[dataPointIndex].nameRu === "Дидактический") {

                    }
                    if (competenceBank.componentBankList[dataPointIndex].nameRu === "Проектировочный") {
                        averageLevel *= 1.2;
                        maxLevel *= 1.2;
                    }
                    if (competenceBank.componentBankList[dataPointIndex].nameRu === "Мониторинговый") {

                    }
                    if (competenceBank.componentBankList[dataPointIndex].nameRu === "Личностный") {
                        averageLevel *= 0.8;
                        maxLevel *= 0.8;
                    }
                    const resultString = ReactDOMServer.renderToString(<Tooltip
                        componentName={LocalName.getName(competenceBank.componentBankList[dataPointIndex])}
                        realResult={averageLevel.toFixed(2) + " / " + maxLevel}
                        level={level}
                    />);

                    return resultString;
                }
            },
            annotations: {
                xaxis: [
                    {

                        x: 4,
                        x2: 5,
                        borderColor: '#153C6B',
                        // fillColor: '#B3F7CA',
                        label: {
                            borderColor: '#153C6B',
                            style: {
                                color: '#fff',
                                background: '#153C6B',
                                fontSize: '15px',
                                fontFamily: 'Montserrat, Arial, sans-serif',
                                fontWeight: 600,
                            },
                            orientation: "horizontal",
                            text: lan.zeroLevel,
                        }
                    },
                    {
                        x: 6,
                        x2: 10,
                        borderColor: '#153C6B',
                        label: {
                            borderColor: '#153C6B',
                            style: {
                                color: '#fff',
                                background: '#153C6B',
                                fontSize: '15px',
                                fontFamily: 'Montserrat, Arial, sans-serif',
                                fontWeight: 600,
                            },
                            orientation: "horizontal",
                            text: lan.situationalLevel,
                            // offsetX: 135,
                        }
                    },
                    {
                        x: 11,
                        x2: 14,
                        borderColor: '#153C6B',
                        label: {
                            borderColor: '#153C6B',
                            style: {
                                color: '#fff',
                                background: '#153C6B',
                                fontSize: '15px',
                                fontFamily: 'Montserrat, Arial, sans-serif',
                                fontWeight: 600,
                            },
                            orientation: "horizontal",
                            text: lan.developingLevel,
                            // offsetX: 35,
                        }
                    },
                    {
                        x: 15,
                        x2: 18,
                        borderColor: '#153C6B',
                        label: {
                            borderColor: '#153C6B',
                            style: {
                                color: '#fff',
                                background: '#153C6B',
                                fontSize: '15px',
                                fontFamily: 'Montserrat, Arial, sans-serif',
                                fontWeight: 600,
                            },
                            orientation: "horizontal",
                            text: lan.advancedLevel,
                            // offsetX: 20,
                        }
                    },
                    {
                        x: 20,
                        x2: 19,
                        borderColor: '#153C6B',
                        label: {
                            borderColor: '#153C6B',
                            style: {
                                color: '#fff',
                                background: '#153C6B',
                                fontSize: '15px',
                                fontFamily: 'Montserrat, Arial, sans-serif',
                                fontWeight: 600,
                            },
                            orientation: "horizontal",
                            text: lan.expertLevel,
                            // offsetX: 20,
                        },

                    },

                ]
            },
        },

        series: [
            {
                name: "Achieved",
                data: data
            },
        ]
    };

    const config = {
        options: {
            chart: {
                dropShadow: {
                    enabled: true,
                    blur: 1,
                    left: 1,
                    top: 1
                }
            },
            colors: ["#bf8e35", "#292318"],
            labels: labels,
            dataLabels: {
                enabled: true
            },
            stroke: {
                width: 2,
            },
            fill: {
                opacity: 0
            },
            markers: {
                size: 5,
            },
            yaxis: {
                max:20,
                min:0,
                tickAmount: 5,
            },
            xaxis: {
                labels: {
                    style: {
                        colors: ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
                        fontSize: '15px',
                        fontFamily: 'Montserrat, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
            },
            tooltip: {
                custom: function({series, seriesIndex, dataPointIndex, w}) {
                    // var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                    //
                    // console.log("_________")
                    // console.log(competenceBank.componentBankList[dataPointIndex]);
                    // console.log(series)
                    // console.log(seriesIndex)
                    // console.log(dataPointIndex) // index
                    // console.log(w)
                    let level = '';
                    const averagePoint = competenceBank.componentBankList[dataPointIndex].averagePoint;
                    // const maxPoint = competenceBank.componentBankList[dataPointIndex].maxPoint;
                    // const percent = (averagePoint / maxPoint) * 100;
                    if (averagePoint <= 5) {
                        level = lan.zeroLevel;
                    }
                    if (averagePoint > 5 && averagePoint < 11) {
                        level = lan.situationalLevel;
                    }
                    if (averagePoint >= 11 && averagePoint < 15) {
                        level = lan.developingLevel;
                    }
                    if (averagePoint >= 15 && averagePoint < 19) {
                        level = lan.advancedLevel;
                    }
                    if (averagePoint >= 19) {
                        level = lan.expertLevel;
                    }
                    let averageLevel = competenceBank.componentBankList[dataPointIndex].averagePoint;
                    let maxLevel = competenceBank.componentBankList[dataPointIndex].maxPoint;
                    if (competenceBank.componentBankList[dataPointIndex].nameRu === "Дидактический") {

                    }
                    if (competenceBank.componentBankList[dataPointIndex].nameRu === "Проектировочный") {
                        averageLevel *= 1.2;
                        maxLevel *= 1.2;
                    }
                    if (competenceBank.componentBankList[dataPointIndex].nameRu === "Мониторинговый") {

                    }
                    if (competenceBank.componentBankList[dataPointIndex].nameRu === "Личностный") {
                        averageLevel *= 0.8;
                        maxLevel *= 0.8;
                    }
                    const resultString = ReactDOMServer.renderToString(<Tooltip
                        componentName={LocalName.getName(competenceBank.componentBankList[dataPointIndex])}
                        realResult={averageLevel.toFixed(2) + " / " + maxLevel}
                        level={level}
                    />);

                    return resultString;
                }
            }
        },

        series: [
            {
                name: "Achieved",
                data: data
            },
        ]
    };

    function getLevelCompetence() {
        let level = 0;
        competenceBank.componentBankList.forEach(component => {
            if (component.nameRu === "Дидактический") {
                level += Number(component.averagePoint);
            }
            if (component.nameRu === "Проектировочный") {
                level += Number(component.averagePoint) * 1.2;
            }
            if (component.nameRu === "Мониторинговый") {
                level += Number(component.averagePoint);
            }
            if (component.nameRu === "Личностный") {
                level += Number(component.averagePoint) * 0.8;
            }
        });

        if (level <= 20) {
            return lan.zeroLevel;
        }
        if (level >= 21 && level <= 40) {
            return lan.situationalLevel;
        }
        if (level >= 41 && level <= 56) {
            return lan.developingLevel;
        }
        if (level >= 57 && level <= 72) {
            return lan.advancedLevel;
        }
        return lan.expertLevel;
    }

    if (isLoading) {
        return (
            <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
                <HeaderPlatform/>
                <Block style={{marginTop: "50px", alignItems: "flex-start"}}>
                    <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.competenceMap}</Text>
                    <Alert>{lan.competenceMap}</Alert>
                    <Card type={"horizontal-big"}/>
                    <Card type={"horizontal-big"}/>
                </Block>
            </div>
        );
    }

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px", alignItems: "flex-start", gap: "20px"}}>
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.competenceMap}</Text>
                <Button onClick={() => {navigate('/competence-bank')}}>{lan.takeAnketa}</Button>
                <Alert>{lan.competenceMap}</Alert>
                <AntdCard style={{width: "100%", fontSize: "1rem"}}><b>{lan.yourLevelCompetence}:</b> {getLevelCompetence()}</AntdCard>
                <FlexBlock style={{
                    backgroundColor: clrs.white,
                    borderRadius: "15px",
                    paddingTop: "50px",
                    paddingBottom: "50px"
                }}>
                    <Chart
                        options={config.options}
                        series={config.series}
                        type="radar"
                        className={classes.myChart}
                    />
                </FlexBlock>

                <FlexBlock style={{
                    backgroundColor: clrs.white,
                    borderRadius: "15px",
                    paddingTop: "50px",
                    paddingBottom: "50px"
                }}>
                    <Chart
                        options={config2.options}
                        series={config2.series}
                        type="bar"
                        className={classes.myChart}
                    />
                </FlexBlock>

            </Block>
        </div>
    );
};

export default CompetenceMap;