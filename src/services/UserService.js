import axios from "axios";
import Cookies from "js-cookie";
import {API_BASE_URL} from "../constants/api";

export function getUserByToken() {
    let data = new FormData();
    const token = Cookies.get('Authorization');
    data.append("token", token);

    return axios({
        method: "post",
        url: API_BASE_URL + "/api/user/get/token",
        data: data,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}