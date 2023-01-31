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
}

const kz = {
    aboutUs:"Біз туралы",
}


export const lan = Cookies.get('lan') == null ? eng : (Cookies.get('lan') === "ru" ? ru : kz)