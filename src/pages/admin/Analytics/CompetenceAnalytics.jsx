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
import * as XLSX from 'xlsx';
import UserService from "../../../services/UserService";
import AdminUserService from "../../../services/AdminUserService";
import CompetenceService from "../../../services/CompetenceService";
import {message, notification} from "antd";
import BlockLoading from "../../../components/LoadingComponents/BlockLoading";

const CompetenceAnalytics = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const {analytics, isLoading} = useSelector(state => state.analytics.competenceBank);
    const userAnalytics = useSelector(state => state.analytics.users);

    const [downloadLoading, setDownloadLoading] = useState(false);

    useEffect(() => {
        console.log(analytics);
    }, [analytics]);

    const [selectedComponent, setSelectedComponent] = useState(null);


    const generateExcelFile = async () => {
        await AdminUserService.getAllUsers(1, 1000)
            .then(async (r) => {
                // messageApi.open({
                //     type: 'loading',
                //     content: 'Загрузка...',
                //     duration: 0,
                // });
                // notification.info({
                //     message: 'Загрузка...',
                //     placement: 'topRight'
                // })
                setDownloadLoading(true);
                console.log(r.data.length)
                let usersList = [];
                for (const user of r.data) {
                    await CompetenceService.getCompetenceBankByUserId(user.id)
                        .then((r) => {
                            usersList.push(
                                {
                                    "ФИО": user.fullName,
                                    "Имя пользователя": user.username,
                                    "Университет": user.university?.name,
                                    "Дидактический": r.data.componentBankList[0]?.averagePoint == 0 ? 0 : Number((r.data.componentBankList[0]?.averagePoint / r.data.componentBankList[0]?.maxPoint * 100).toFixed(2)),
                                    "Проектировочный": r.data.componentBankList[1]?.averagePoint == 0 ? 0 : Number((r.data.componentBankList[1]?.averagePoint / r.data.componentBankList[1]?.maxPoint * 100).toFixed(2)),
                                    "Мониторинговый": r.data.componentBankList[2]?.averagePoint == 0 ? 0 : Number((r.data.componentBankList[2]?.averagePoint / r.data.componentBankList[2]?.maxPoint * 100).toFixed(2)),
                                    "Личностный": r.data.componentBankList[3]?.averagePoint == 0 ? 0 : Number((r.data.componentBankList[3]?.averagePoint / r.data.componentBankList[3]?.maxPoint * 100).toFixed(2)),
                                    // "Мониторинговый":Number((r.data.componentBankList[4]?.averagePoint / r.data.componentBankList[4]?.maxPoint * 100).toFixed(2)),
                                    // "Личностно-мотивационный":Number((r.data.componentBankList[5]?.averagePoint / r.data.componentBankList[5]?.maxPoint * 100).toFixed(2)),
                                }
                            )
                        })
                        .catch(() => {

                        })
                }
                const ws = XLSX.utils.json_to_sheet(usersList);

                // Create a workbook
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

                // Save the file
                XLSX.writeFile(wb, 'stats.xlsx');

                // message.destroy();
                // message.success('Успешно', 5);
                setDownloadLoading(false);
            })
            .catch(() => {

            })
    };

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
                    labels: {
                        formatter: function(val) {
                            return val.toFixed(0)
                        }
                    },
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
                        labels: {
                            formatter: function(val) {
                                return val.toFixed(0)
                            }
                        },
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
                        labels: {
                            formatter: function(val) {
                                return val.toFixed(0)
                            }
                        },
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
                    labels: {
                        formatter: function(val) {
                            return val.toFixed(0)
                        }
                    },
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
            <BlockLoading isLoading={downloadLoading}/>
            <Button onClick={generateExcelFile} type={2}>Скачать статистику</Button>
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