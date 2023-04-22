import React, {useState} from 'react';
import BigText from "../components/UI/BigText/BigText";
import {lan} from "../constants/lan";
import Footer from "../components/Footer/Footer";
import Block from "../components/UI/Block/Block";
import InfoList from "../components/UI/InfoList/InfoList";
import img from '../images/naruto.jpg';
import InfoItem from "../components/UI/InfoList/InfoItem";
import TeamMember from "../components/TeamMember/TeamMember";
import {clrs} from "../constants/colors";
import Publication from "../components/Publication/Publication";
import Header from "../components/Header/Header";
import naruto from "../images/naruto.jpg";
import Banner from "../components/Banner/Banner";
import Chart from "react-apexcharts";
import tm1 from '../images/tm1.png';
import tm2 from '../images/tm2.jpg';
import tm3 from '../images/tm3.jpg';
import tm4 from '../images/tm4.png';
import tm5 from '../images/tm5.jpeg';
import tm6 from '../images/tm6.jpg';
import tm7 from '../images/tm7.jpg';
import tm8 from '../images/tm8.jpg';



const HomePage = () => {
    // Cookies.remove('Authorization');

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
            labels: [
                "Knowledgeable",
                "Design",
                "Informational",
                "Communicative",
                "Reflective",
                "Monitoring",
                "Personal-motivational",
            ],
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
                data: [
                    50.5,
                    70.1,
                    80.6,
                    66.8,
                    30.98,
                    88,
                    100,
                ]
            },
            {
                name: "Required",
                data: [
                    100,
                    100,
                    100,
                    100,
                    100,
                    100,
                    100,
                ]
            }
        ]
    };

    return (
        <div>
            <Header/>
            <Banner/>
            <Block id={"aboutUs"}>
                <BigText>{lan.aboutUs}</BigText>
                <InfoList>
                    <InfoItem image={img} text={"Добавьте ваш товар в корзину и оформите заказ"}/>
                    <InfoItem image={img} text={"Мы выкупим ваш товар у поставщиков"}/>
                    <InfoItem image={img} text={"Мы доставим ваш товар до двери"}/>
                    <InfoItem image={img} text={"Мы доставим ваш товар до двери"}/>
                    <InfoItem image={img} text={"Мы доставим ваш товар до двери"}/>
                    <InfoItem image={img} text={"Мы доставим ваш товар до двери"}/>
                    <InfoItem image={img} text={"Мы доставим ваш товар до двери"}/>
                    <InfoItem image={img} text={"Мы доставим ваш товар до двери"}/>
                </InfoList>
            </Block>
            <Block>
                <BigText>{lan.levelCompetence}</BigText>
                <Chart
                    options={config.options}
                    series={config.series}
                    type="radar"
                    width={1000}
                />
            </Block>

            <Block id={"team"} style={{backgroundColor: clrs.green}}>
                <div style={{marginBottom: '30px'}}>
                    <BigText style={{color:clrs.white}}>{lan.projectTeam}</BigText>
                </div>
                <InfoList>
                    <TeamMember
                        image={tm1}
                        fullName={"Мухатаев Айдос"}
                        position={"Руководитель проекта, к.п.н., доцент."}
                        description={"Директор НЦРВО МНВО РК"}/>
                    <TeamMember
                        image={tm2}
                        fullName={"Омирбаев Серик"}
                        position={"СНС, д.э.н., профессор."}
                        description={"Первый проректор Astana IT University"}/>
                    <TeamMember
                        image={tm3}
                        fullName={"Белощицкий Андрей"}
                        position={"СНС, д.т.н., профессор."}
                        description={"Проректор по науке и инновациям Astana IT University"}/>
                    <TeamMember
                        image={tm4}
                        fullName={"Касенов Ханат"}
                        position={"НС, PhD of Education."}
                        description={"Директор департамента обеспечения качества AITU"}/>
                    <TeamMember
                        image={tm5}
                        fullName={"Куангалиева Турсынзада"}
                        position={"НС, к.эн., доцент."}
                        description={"Проректор по академической деятельности APEMS"}/>
                    <TeamMember
                        image={tm6}
                        fullName={"Токсанов Сапар"}
                        position={"МНС, PhD candidate."}
                        description={"Директор Центра компетенций и совершенства AITU"}/>
                    <TeamMember
                        image={tm7}
                        fullName={"Файзуллин Адиль"}
                        position={"МНС, PhD candidate."}
                        description={"Директор департамента стратегии и корпоративного управления AITU"}/>
                    <TeamMember
                        image={tm8}
                        fullName={"Омарова Сафура"}
                        position={"МНС, PhD докторант"}
                        description={"ЕНУ им. Л.Н.Гумилева"}/>
                </InfoList>
            </Block>

            <Block id={"publications"}>
                <BigText>{lan.publications}</BigText>
                <InfoList>
                    <Publication text={"Correspondence between dental and skeletal maturity parameters among patients with different sagittal relationships at the end of puberty period, Journal of International Dental and Medical Research, 2020, 13(1), pp. 223–228"}/>
                    <Publication text={"Correspondence between dental and skeletal maturity parameters among patients with different sagittal relationships at the end of puberty period, Journal of International Dental and Medical Research, 2020, 13(1), pp. 223–228"}/>
                    <Publication text={"Correspondence between dental and skeletal maturity parameters among patients with different sagittal relationships at the end of puberty period, Journal of International Dental and Medical Research, 2020, 13(1), pp. 223–228"}/>
                    <Publication text={"Correspondence between dental and skeletal maturity parameters among patients with different sagittal relationships at the end of puberty period, Journal of International Dental and Medical Research, 2020, 13(1), pp. 223–228"}/>
                    <Publication text={"Correspondence between dental and skeletal maturity parameters among patients with different sagittal relationships at the end of puberty period, Journal of International Dental and Medical Research, 2020, 13(1), pp. 223–228"}/>
                    <Publication text={"Correspondence between dental and skeletal maturity parameters among patients with different sagittal relationships at the end of puberty period, Journal of International Dental and Medical Research, 2020, 13(1), pp. 223–228"}/>
                </InfoList>

            </Block>
            <Footer/>
        </div>
    );
};

export default HomePage;