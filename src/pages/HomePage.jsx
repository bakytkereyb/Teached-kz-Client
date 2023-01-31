import React from 'react';
import Header from "../components/Header/Header";
import AboutUs from "../components/AboutUs";
import LevelOfCompetence from "../components/LevelOfCompetence";
import ProjectTeam from "../components/ProjectTeam";
import BigText from "../components/UI/BigText/BigText";
import {lan} from "../constants/lan";
import Publication from "../components/Publication/Publication";
import Publications from "../components/Publications";
import Footer from "../components/Footer/Footer";


const HomePage = () => {

    return (
        <div>
            <Header/>
            <AboutUs/>
            <LevelOfCompetence/>
            <ProjectTeam/>
            <Publications/>
            <Footer/>
        </div>
    );
};

export default HomePage;