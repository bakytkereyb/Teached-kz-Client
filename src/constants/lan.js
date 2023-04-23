import forecasting from "../images/forecasting-model.svg";
import concept from "../images/concept.svg";
import rise from "../images/selection-raise-symbolic.svg";
import course from "../images/e-learning-completed-course.svg";
import education from "../images/school.svg";
import practice from "../images/clipboard-alt.svg";
import innovation from "../images/innovation.svg";
import software from "../images/software-layout-header-complex2.svg";

const ru = {
    aboutUs:"О Нас",
    team:"Команда",
    publications:"Публикаций",
    contacts:"Контакты",
    aboutUs_forecasting: "Система прогнозирования и поддержки развития",
    aboutUs_concept: "Концепция развития методической компетентности",
    aboutUs_rise: "Курсы повышения квалификации для преподавателей",
    aboutUs_course: "Система курсовой и посткурсовой поддержки",
    aboutUs_education: "Развитие IT-образования",
    aboutUs_practice: "Практические занятия",
    aboutUs_innovation: "Инновационный подход",
    aboutUs_software: "Программное и учебно-методическое обеспечение",
}

const eng = {
    aboutUs:"About Us",
    team:"Team",
    publications:"Publications",
    contacts:"Contacts",
    levelCompetence: "Do you want to know the level of your competence?",
    projectTeam: "Project Team",
    noAccount: "I don't have an account",
    yesAccount: "I have an account",
    login: "Login",
    log_in: "Log in",
    register: "Registration",
    dashboard: "Dashboard",
    coursesAll: "All courses",
    coursesMy: "My courses",
    coursesPre: "Pre-courses",
    competenceMap: "Competence Map",
    myTasks: "My Tasks",
    chats: "Chats",
    calendar: "Calendar",
    setting: "Settings",
    logout: "Logout",
    error: "Error",
    problem: "Sorry, we have some problems",
    back: "Back",
    taskDone: "Task Done",
    lessons: "Lessons",
    students: "Students",
    posts: "Posts",
    tests: "Tests",
    tasks: "Tasks",
    addLesson: "Add lesson",
    cabinet: "Cabinet",
    aboutUs_forecasting: "Development forecasting and support system",
    aboutUs_concept: "Concept of methodological competence development",
    aboutUs_rise: "Professional development courses for teachers",
    aboutUs_course: "System of course and post-course support",
    aboutUs_education: "IT-education development",
    aboutUs_practice: "Practical training",
    aboutUs_innovation: "Innovative Approach",
    aboutUs_software: "Software and educational-methodical support",
}

const kz = {
    aboutUs:"Біз туралы",
}


export const lan = localStorage.getItem('lan') === "ENG" ? eng : (localStorage.getItem('lan') === "РУС" ? ru : (localStorage.getItem('lan') === "ҚАЗ" ? kz : eng))