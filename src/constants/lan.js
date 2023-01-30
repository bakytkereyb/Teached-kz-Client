import Cookies from "js-cookie";

const ru = {
    aboutUs:"О Нас",
}

const eng = {
    aboutUs:"About Us",
}

const kz = {
    aboutUs:"Біз туралы",
}


export const lan = Cookies.get('lan') == null ? eng : (Cookies.get('lan') === "ru" ? ru : kz)