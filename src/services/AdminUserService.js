import axios from "axios";
import {API_BASE_URL} from "../constants/api";
import {ACCESS_TOKEN} from "../constants/auth";

const AdminUserService = {};

AdminUserService.getAllUsers = async function (page, limit) {
    const response = await axios({
        method: "get",
        url: API_BASE_URL + `/api/user/get?page=${page - 1}&limit=${limit}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
    const data = response.data.list;
    const hasMore = response.data.hasMore;
    return { data, hasMore };
}

AdminUserService.getAllUsersByName = async function (name, page, limit) {
    const response = await axios({
        method: "get",
        url: API_BASE_URL + `/api/user/search?page=${page - 1}&limit=${limit}&name=${name}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
    const data = response.data.list;
    const hasMore = response.data.hasMore;
    return { data, hasMore };
}

AdminUserService.createAdmin = async function (username, firstName, secondName, password, email) {

    let data = new FormData();
    data.append("username", username);
    data.append("firstName", firstName);
    data.append("secondName", secondName);
    data.append("password", password);
    data.append("email", email);

    return axios({
        method: "post",
        url: API_BASE_URL + "/api/user/save/admin",
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}


AdminUserService.createTrainer = async function (username, firstName, secondName, password, email) {

    let data = new FormData();
    data.append("username", username);
    data.append("firstName", firstName);
    data.append("secondName", secondName);
    data.append("password", password);
    data.append("email", email);

    return axios({
        method: "post",
        url: API_BASE_URL + "/api/user/save/trainer",
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}


export default AdminUserService;