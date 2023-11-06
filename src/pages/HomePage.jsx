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
import tm4 from '../images/hanat.jpg';
import tm5 from '../images/tm5.jpeg';
import tm6 from '../images/DSC02835.jpg';
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
import ProjectAim from "./Homepage/ProjectAim";



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
            <Block>
                <ProjectAim/>
            </Block>
            <Block style={{overflow: "hidden"}}>
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
                        description={lan.muhataevAidosDesc}
                        desc2={lan.muhataevAidosDesc2}
                    />
                    <TeamMember
                        image={tm2}
                        fullName={lan.omirbayevSerik}
                        position={lan.omirbayevSerikPos}
                        description={lan.omirbayevSerikDesc}
                        desc2={lan.omirbayevSerikDesc2}
                    />
                    <TeamMember
                        image={tm3}
                        fullName={lan.beloshitski}
                        position={lan.beloshitskiPos}
                        description={lan.beloshitskiDesc}
                        desc2={lan.beloshitskiDesc2}
                    />
                    <TeamMember
                        image={tm6}
                        fullName={lan.sapar}
                        position={lan.saparPos}
                        description={lan.saparDesc}
                        desc2={lan.saparDesc2}
                    />
                    <TeamMember
                        image={tm7}
                        fullName={lan.faizullin}
                        position={lan.faizullinPos}
                        description={lan.faizullinDesc}
                        desc2={lan.faizullinDesc2}
                    />

                    <TeamMember
                        image={tm4}
                        fullName={lan.kasenov}
                        position={lan.kasenovPos}
                        description={lan.kasenovDesc}
                        desc2={lan.kasenovDesc2}
                    />
                    <TeamMember
                        image={tm5}
                        fullName={lan.kuangalieva}
                        position={lan.kuangalievaPos}
                        description={lan.kuangalievaDesc}
                        desc2={lan.kuangalievaDesc2}
                    />
                    <TeamMember
                        image={tm8}
                        fullName={lan.omarova}
                        position={lan.omarovaPos}
                        description={lan.omarovaDesc}
                        desc2={lan.omarovaDesc2}
                    />
                </InfoList>
            </Block>

            <Block id={"publications"}>
                <BigText>{lan.publications}</BigText>
                <InfoList>
                    <Publication link={'https://vestnik-pedagogic.tou.edu.kz/storage/articles/811d1e9d60cb89dbec731159f2213f7c/%D0%9A%D0%B0%D1%81%D0%B5%D0%BD%D0%BE%D0%B2_%D0%A5._%D0%9D.,_%D0%9C%D1%83%D1%85%D0%B0%D1%82%D0%B0%D0%B5%D0%B2_%D0%90._%D0%90.,_%D0%9E%D0%BC%D0%B8%D1%80%D0%B1%D0%B0%D0%B5%D0%B2_%D0%A1._%D0%9C.,_%D0%9E%D0%BC%D0%B0%D1%80%D0%BE%D0%B2%D0%B0_%D0%A1._%D0%9A.,_%D0%A2%D0%BE%D0%BA%D1%81%D0%B0%D0%BD%D0%BE%D0%B2_%D0%A1._%D0%9D..pdf'} text={"Domestic and international experience in organizing the process of professional competence development of teachers"}/>
                    <Publication link={'https://sj.astanait.edu.kz/wp-content/uploads/2023/02/Journal_AITU_12vol_dec22-122-138.pdf'} text={"A structural model for building a system for the development of methodological competence and methods for evaluating its effectiveness\n"}/>
                    <Publication link={'https://journals.uran.ua/eejet/article/view/289045/283703'} text={"Methodical competence of a computer science teacher in education"}/>
                    <Publication link={'https://bulpedps.enu.kz/index.php/main/article/download/507/192/2959'} text={"Key factors of digital transformation of higher education"}/>
                </InfoList>

            </Block>
            <Footer/>
        </div>
    );
};

export default HomePage;