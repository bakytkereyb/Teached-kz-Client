import axios from "axios";
import {API_BASE_URL} from "../Constants";
import Cookies from "js-cookie";

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