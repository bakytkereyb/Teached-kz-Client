import axios from "axios";
import {API_BASE_URL} from "../constants/api";
import {ACCESS_TOKEN} from "../constants/auth";

const AdminCourseService = {};

AdminCourseService.getAllCourses = async function () {
    return axios({
        method: "get",
        url: API_BASE_URL + "/api/course/get?skip=0&limit=100",
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