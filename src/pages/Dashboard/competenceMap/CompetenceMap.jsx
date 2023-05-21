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

const CompetenceMap = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {competenceBank, isLoading} = useSelector(state => state.competenceBank);


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
                return Number((component.averagePoint / component.maxPoint * 100).toFixed(2));
            }));
            // setDataRequired(competenceBank.componentBankList.map(component => {
            //     return 100;
            // }));
            console.log(competenceBank)
        }
    }, [competenceBank])

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