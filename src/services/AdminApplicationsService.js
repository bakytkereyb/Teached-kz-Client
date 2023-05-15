import axios from "axios";
import {API_BASE_URL} from "../constants/api";
import {ACCESS_TOKEN} from "../constants/auth";

const AdminApplicationsService = {};

AdminApplicationsService.getAllApplications = async function (page, limit) {
    const response = await axios({
        method: "get",
        url: API_BASE_URL + `/api/application/get?page=${page - 1}&limit=${limit}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
    const data = response.data.list;
    const hasMore = response.data.hasMore;
    return { data, hasMore };
}

AdminApplicationsService.updateApplication = async function (id, status) {

    let data = new FormData();
    data.append("status", status);

    return axios({
        method: "patch",
        url: API_BASE_URL + `/api/application/${id}/status`,
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

export default AdminApplicationsService;