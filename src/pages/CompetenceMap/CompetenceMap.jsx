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
            setData(competenceBank.componentBankList.map(component => {
                if (component.maxPoint === 0.0) {
                    return 0;
                }
                return Number((component.averagePoint / component.maxPoint * 100).toFixed(2));
            }));
            setRealData(competenceBank.componentBankList.map(component => {
                if (component.maxPoint === 0.0) {
                    return 0;
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
                max:100,
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
                    const maxPoint = competenceBank.componentBankList[dataPointIndex].maxPoint;
                    const percent = (averagePoint / maxPoint) * 100;
                    if (percent <= 50) {
                        level = lan.lowLevel;
                    }
                    if (percent > 50 && percent < 75) {
                        level = lan.acceptableLevel;
                    }
                    if (percent >= 75 && percent < 85) {
                        level = lan.averageLevel;
                    }
                    if (percent >= 85 && percent < 95) {
                        level = lan.advancedLevel;
                    }
                    if (percent >= 95) {
                        level = lan.expertLevel;
                    }
                    const resultString = ReactDOMServer.renderToString(<Tooltip
                        componentName={LocalName.getName(competenceBank.componentBankList[dataPointIndex])}
                        realResult={competenceBank.componentBankList[dataPointIndex].averagePoint + " / " + competenceBank.componentBankList[dataPointIndex].maxPoint}
                        level={level}
                    />);

                    return resultString;
                }
            },
            annotations: {
                xaxis: [
                    {

                        x: 49,
                        x2: 50,
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
                            text: lan.lowLevel,
                        }
                    },
                    {
                        x: 51,
                        x2: 74,
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
                            text: lan.acceptableLevel,
                            offsetX: 135,
                        }
                    },
                    {
                        x: 75,
                        x2: 84,
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
                            text: lan.averageLevel,
                            offsetX: 35,
                        }
                    },
                    {
                        x: 85,
                        x2: 94,
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
                            offsetX: 20,
                        }
                    },
                    {
                        x: 100,
                        x2: 95,
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
                            offsetX: 20,
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
                max:100,
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
                    const maxPoint = competenceBank.componentBankList[dataPointIndex].maxPoint;
                    const percent = (averagePoint / maxPoint) * 100;
                    if (percent <= 50) {
                        level = lan.lowLevel;
                    }
                    if (percent > 50 && percent < 75) {
                        level = lan.acceptableLevel;
                    }
                    if (percent >= 75 && percent < 85) {
                        level = lan.averageLevel;
                    }
                    if (percent >= 85 && percent < 95) {
                        level = lan.advancedLevel;
                    }
                    if (percent >= 95) {
                        level = lan.expertLevel;
                    }
                    const resultString = ReactDOMServer.renderToString(<Tooltip
                        componentName={LocalName.getName(competenceBank.componentBankList[dataPointIndex])}
                        realResult={competenceBank.componentBankList[dataPointIndex].averagePoint + " / " + competenceBank.componentBankList[dataPointIndex].maxPoint}
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