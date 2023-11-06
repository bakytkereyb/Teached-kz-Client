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
import forecasting from '../images/forecasting-model.svg';
import concept from '../images/concept.svg';
import rise from '../images/selection-raise-symbolic.svg';
import course from '../images/e-learning-completed-course.svg';
import education from '../images/school.svg';
import practice from '../images/clipboard-alt.svg';
import innovation from '../images/innovation.svg';
import software from '../images/software-layout-header-complex2.svg';
import classes from './CompetenceMap/competence.module.css';



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
                    <InfoItem image={forecasting} text={lan.aboutUs_forecasting}/>
                    <InfoItem image={concept} text={lan.aboutUs_concept}/>
                    <InfoItem image={rise} text={lan.aboutUs_rise}/>
                    <InfoItem image={course} text={lan.aboutUs_course}/>
                    <InfoItem image={education} text={lan.aboutUs_education}/>
                    <InfoItem image={practice} text={lan.aboutUs_practice}/>
                    <InfoItem image={innovation} text={lan.aboutUs_innovation}/>
                    <InfoItem image={software} text={lan.aboutUs_software}/>
                </InfoList>
            </Block>
            <Block style={{overflow: "hidden"}}>
                <BigText>{lan.levelCompetence}</BigText>
                <Chart
                    options={config.options}
                    series={config.series}
                    type="radar"
                    className={classes.myChart}
                />
            </Block>

            <Block id={"team"} style={{backgroundColor: clrs.green}}>
                <div style={{marginBottom: '30px'}}>
                    <BigText style={{color:clrs.white}}>{lan.projectTeam}</BigText>
                </div>
                <InfoList>
                    <TeamMember
                        image={tm1}
                        fullName={lan.muhataevAidos}
                        position={lan.muhataevAidosPos}
                        description={lan.muhataevAidosDesc}/>
                    <TeamMember
                        image={tm2}
                        fullName={lan.omirbayevSerik}
                        position={lan.omirbayevSerikPos}
                        description={lan.omirbayevSerikDesc}/>
                    <TeamMember
                        image={tm3}
                        fullName={lan.beloshitski}
                        position={lan.beloshitskiPos}
                        description={lan.beloshitskiDesc}/>
                    <TeamMember
                        image={tm4}
                        fullName={lan.kasenov}
                        position={lan.kasenovPos}
                        description={lan.kasenovDesc}/>
                    <TeamMember
                        image={tm5}
                        fullName={lan.kuangalieva}
                        position={lan.kuangalievaPos}
                        description={lan.kuangalievaDesc}/>
                    <TeamMember
                        image={tm6}
                        fullName={lan.sapar}
                        position={lan.saparPos}
                        description={lan.saparDesc}/>
                    <TeamMember
                        image={tm7}
                        fullName={lan.faizullin}
                        position={lan.faizullinPos}
                        description={lan.faizullinDesc}/>
                    <TeamMember
                        image={tm8}
                        fullName={lan.omarova}
                        position={lan.omarovaPos}
                        description={lan.omarovaDesc}/>
                </InfoList>
            </Block>

            <Block id={"publications"}>
                <BigText>{lan.publications}</BigText>
                <InfoList>
                    <Publication text={"Domestic and international experience in organizing the process of professional competence development of teachers"}/>
                    <Publication text={"Structural model of the system for the development of methodological competence of teachers of IT disciplines based on lifelong learning"}/>
                    <Publication text={"Methodical competence of a computer science teacher in education"}/>
                    <Publication text={"Digital transformation of higher education: key factors"}/>
                </InfoList>

            </Block>
            <Footer/>
        </div>
    );
};

export default HomePage;