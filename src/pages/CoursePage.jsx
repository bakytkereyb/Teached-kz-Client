import React from 'react';
import {clrs} from "../constants/colors";
import HeaderPlatform from "../components/HeaderPlatform/HeaderPlatform";
import Block from "../components/UI/Block/Block";
import naruto from "../images/naruto.jpg"
import Text from "../components/UI/Text/Text";
import Button from "../components/UI/Button/Button";
import {lan} from "../constants/lan";
import BigText from "../components/UI/BigText/BigText";
import courses from "../images/courses.svg"

const CoursePage = () => {
    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px"}}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'start',
                    flexDirection: 'row',
                    background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
                    width: '100%',
                    borderRadius: "25px",
                    padding: '20px 100px',
                    gap: '50px',
                    boxSizing: "border-box"
                }}>
                    <img src={naruto} alt="avatar" style={{height: '300px', borderRadius: '50%'}}/>
                    <div style={{
                        display: "flex", alignItems: "start",
                        justifyContent: 'center', flexDirection: 'column',
                    }}>
                        <Text style={{fontWeight: 400, fontSize: '1rem'}}>Trainer</Text>
                        <Text style={{fontWeight: 600, fontSize: '1.2rem'}}>Dias Utebayev Uzumaki</Text>
                    </div>
                    <div style={{
                        display: "flex", alignItems: "start",
                        justifyContent: 'center', flexDirection: 'column',
                    }}>
                        <Text style={{fontWeight: 400, fontSize: '1rem'}}>Lessons</Text>
                        <Text style={{fontWeight: 600, fontSize: '1.2rem'}}>69</Text>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'start',
                    flexDirection: 'row',
                    background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
                    width: '100%',
                    borderRadius: "25px",
                    padding: '30px 100px',
                    gap: '50px',
                    boxSizing: "border-box"
                }}>
                    <Button type={2}>{lan.lessons}</Button>
                    <Button type={2}>{lan.students}</Button>
                    <Button type={2}>{lan.tasks}</Button>
                    <Button type={2}>{lan.posts}</Button>
                    <Button type={2}>{lan.tests}</Button>
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: 'center',
                    flexDirection: 'column',
                    background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
                    width: '100%',
                    borderRadius: "25px",
                    padding: '30px 100px',
                    gap: '20px',
                    boxSizing: "border-box"
                }}>
                    <BigText>Course name</BigText>
                    <Button type={2}>{lan.addLesson}</Button>
                    <div style={{width: '100%'}}>
                        <Text style={{
                            border: "1px solid black",
                            width: '100%',
                            fontSize: '1.4rem',
                            padding: '10px'
                        }}>Introduction</Text>
                        <div style={{
                            display: "flex",
                            flexDirection: 'column',
                            alignItems: "flex-start",
                            justifyContent: 'center',
                            border: "1px solid black",
                            width: '100%',
                            borderTop: 'none',
                            padding: '20px 10px',
                            gap: '20px'
                        }}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "start", gap: '10px'}}>
                                <img src={courses} alt=""/>
                                <Text style={{fontSize: '1.1rem', fontWeight: 600}}>Syllabus</Text>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "start", gap: '10px'}}>
                                <img src={courses} alt=""/>
                                <Text style={{fontSize: '1.1rem', fontWeight: 600}}>Assignment 1</Text>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "start", gap: '10px'}}>
                                <img src={courses} alt=""/>
                                <Text style={{fontSize: '1.1rem', fontWeight: 600}}>Test</Text>
                            </div>
                        </div>
                    </div>
                </div>
            </Block>
        </div>
    );
};

export default CoursePage;