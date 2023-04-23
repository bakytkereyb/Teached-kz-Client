import axios from "axios";
import {API_BASE_URL} from "../constants/api";
import {ACCESS_TOKEN} from "../constants/auth";

const UserService = {};
UserService.getUserByToken = async () => {
    let data = new FormData();
    const token = localStorage.getItem(ACCESS_TOKEN);
    data.append("token", token);

    return axios({
        method: "post",
        url: API_BASE_URL + "/api/user/get/token",
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

UserService.getUserByUsername = async function (username) {
    return axios({
        method: "get",
        url: API_BASE_URL + `/api/user/get/${username}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

UserService.getUsers = async function (skip, limit) {
    return axios({
        method: "get",
        url: API_BASE_URL + `/api/user/get?skip=${skip}&limit=${limit}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

UserService.updateUserByUsername = async function (data) {
    return axios({
        method: "PUT",
        url: API_BASE_URL + `/api/user/${data.username}`,
        data: data,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

export default UserService;