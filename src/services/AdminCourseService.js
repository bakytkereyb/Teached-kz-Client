import axios from "axios";
import {API_BASE_URL} from "../constants/api";
import {ACCESS_TOKEN} from "../constants/auth";

const AdminCourseService = {};

AdminCourseService.getAllCourses = async function (page, limit) {
    const response = await axios({
        method: "get",
        url: API_BASE_URL + `/api/course/get?page=${page - 1}&limit=${limit}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
    const data = response.data.list;
    const hasMore = response.data.hasMore;
    return { data, hasMore };
}

AdminCourseService.getAllPublicCoursesWithoutPage = async function () {
    return axios({
        method: "get",
        url: API_BASE_URL + `/api/course/get/withoutPage?status=PUBLIC`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

AdminCourseService.deleteCourseById = async function (id) {
    return axios({
        method: "delete",
        url: API_BASE_URL + `/api/course/delete/${id}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

AdminCourseService.makeCourseAsPublic = async function (id) {
    return axios({
        method: "patch",
        url: API_BASE_URL + `/api/course/${id}/status/public`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

AdminCourseService.makeCourseAsPrivate = async function (id) {
    return axios({
        method: "patch",
        url: API_BASE_URL + `/api/course/${id}/status/private`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

AdminCourseService.createCourse = async function (name, nameKz, nameRu, description, descriptionKz, descriptionRu, trainerUsername) {

    let data = new FormData();
    data.append("name", name);
    data.append("nameKz", nameKz);
    data.append("nameRu", nameRu);
    data.append("description", description);
    data.append("descriptionKz", descriptionKz);
    data.append("descriptionRu", descriptionRu);
    data.append("trainerUsername", trainerUsername);

    return axios({
        method: "post",
        url: API_BASE_URL + "/api/course/save",
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}


export default AdminCourseService;