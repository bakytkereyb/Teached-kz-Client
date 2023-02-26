import Cookies from "js-cookie";

const ru = {
    aboutUs:"О Нас",
    team:"Команда",
    publications:"Публикаций",
    contacts:"Контакты",
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
    addLesson: "Add lesson"
}

const kz = {
    aboutUs:"Біз туралы",
}


export const lan = Cookies.get('lan') == null ? eng : (Cookies.get('lan') === "ru" ? ru : kz)