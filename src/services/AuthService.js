import axios from "axios";
import {API_BASE_URL} from "../Constants";

export function login(username, password) {
    let data = new FormData();
    data.append("username", username);
    data.append("password", password);

    return axios({
        method: "post",
        url: API_BASE_URL + "/api/auth/login",
        data: data,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export function register(username, password, firstName, secondName, email) {
    let data = new FormData();
    data.append("username", username);
    data.append("password", password);
    data.append("firstName", firstName);
    data.append("secondName", secondName);
    data.append("email", email);

    return axios({
        method: "post",
        url: API_BASE_URL + "/api/user/save",
        data: data,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}