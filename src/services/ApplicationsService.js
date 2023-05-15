import axios from "axios";
import {API_BASE_URL} from "../constants/api";
import {ACCESS_TOKEN} from "../constants/auth";

const ApplicationsService = {};

ApplicationsService.getApplicationById = async function (id) {
   return axios({
        method: "get",
        url: API_BASE_URL + `/api/application/get/${id}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

ApplicationsService.getMyApplications = async function (page, limit) {
    const response = await axios({
        method: "get",
        url: API_BASE_URL + `/api/application/get/my?page=${page - 1}&limit=${limit}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
    const data = response.data.list;
    const hasMore = response.data.hasMore;
    return { data, hasMore };
}

ApplicationsService.createApplication = async function (title, body) {

    let data = new FormData();
    data.append("title", title);
    data.append("body", body);

    return axios({
        method: "post",
        url: API_BASE_URL + "/api/application/save",
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

export default ApplicationsService;