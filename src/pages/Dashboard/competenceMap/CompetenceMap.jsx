import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {lan} from '../../../constants/lan';
import cl from '../CourseCard/Course.module.css';
import Text from '../../../components/UI/Text/Text';
import {LocalName} from '../../../utils/LocalName';
import arrowRight from '../../../images/arrow-circle-right.svg';
import classes from '../../CompetenceMap/competence.module.css';
import Chart from 'react-apexcharts';
import {getCompetenceBank} from '../../../store/slices/competenceSlice';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../../../components/LoadingComponents/Card';
import ReactDOMServer from "react-dom/server";
import Tooltip from "../../CompetenceMap/Tooltip";
import useWindowSize from "../../../hooks/useWindowSize";

const CompetenceMap = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {competenceBank, isLoading} = useSelector(state => state.competenceBank);

    const size = useWindowSize();


    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);

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
                return Number(component.averagePoint);
            }));
            // setDataRequired(competenceBank.componentBankList.map(component => {
            //     return 100;
            // }));
            console.log(competenceBank)
        }
    }, [competenceBank])

    const config = {
        options: {
            plotOptions: {
                radar: {
                    size: size.width >= 1440 ? 150 : size.width >= 1300 ? 140 : size.width >= 1100 ? 120 : size.width >= 1024 ? 100 : size.width >= 860 ? 200 : size.width >= 673 ? 150 : size.width >= 565 ? 100 : 50,
                }
            },
            chart: {
                dropShadow: {
                    enabled: true,
                    blur: 1,
                    left: 1,
                    top: 1
                },
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

    if (isLoading) {
        return <Card type={"big-card-2"}/>;
    }

    return (
        <div className={cl.card} style={{cursor: "pointer"}}>
            <div className={cl.top__card}>
                <Text>{lan.competenceMap}</Text>
                <img onClick={() => {navigate("/competence-map")}} src={arrowRight} alt=""/>
            </div>

            <Chart
                options={config.options}
                series={config.series}
                type="radar"
                className={classes.myChart2}
            />

        </div>
    );
};

export default CompetenceMap;