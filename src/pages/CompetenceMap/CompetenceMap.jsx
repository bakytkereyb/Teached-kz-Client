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

const CompetenceMap = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {competenceBank, isLoading} = useSelector(state => state.competenceBank);

    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
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
            },
            xaxis: {
                tickAmount: 10,
                labels: {
                    style: {
                        colors: [],
                        fontSize: '12px',
                        fontFamily: 'Montserrat, Arial, sans-serif',
                        fontWeight: 500,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
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
                        colors: [],
                        fontSize: '12px',
                        fontFamily: 'Montserrat, Arial, sans-serif',
                        fontWeight: 500,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
            },
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
                <Button onClick={() => {navigate('/competence-bank')}}>{lan.competenceBank}</Button>
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
                        width={1000}
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
                        width={1000}
                    />
                </FlexBlock>

            </Block>
        </div>
    );
};

export default CompetenceMap;