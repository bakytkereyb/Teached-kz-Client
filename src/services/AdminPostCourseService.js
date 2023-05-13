import axios from "axios";
import {API_BASE_URL} from "../constants/api";
import {ACCESS_TOKEN} from "../constants/auth";

const AdminPostCourseService = {};

AdminPostCourseService.getAllPostCourses = async function (page, limit) {
    const response = await axios({
        method: "get",
        url: API_BASE_URL + `/api/post-course/get?page=${page - 1}&limit=${limit}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
    const data = response.data.list;
    const hasMore = response.data.hasMore;
    return { data, hasMore };
}

AdminPostCourseService.deletePostCourseById = async function (id) {
    return axios({
        method: "delete",
        url: API_BASE_URL + `/api/post-course/delete/${id}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

AdminPostCourseService.makePostCourseAsPublic = async function (id) {
    return axios({
        method: "patch",
        url: API_BASE_URL + `/api/post-course/${id}/status/public`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

AdminPostCourseService.makePostCourseAsPrivate = async function (id) {
    return axios({
        method: "patch",
        url: API_BASE_URL + `/api/post-course/${id}/status/private`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

AdminPostCourseService.createPostCourse = async function (name, nameKz, nameRu, description, descriptionKz, descriptionRu) {

    let data = new FormData();
    data.append("name", name);
    data.append("nameKz", nameKz);
    data.append("nameRu", nameRu);
    data.append("description", description);
    data.append("descriptionKz", descriptionKz);
    data.append("descriptionRu", descriptionRu);

    return axios({
        method: "post",
        url: API_BASE_URL + "/api/post-course/save",
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}


export default AdminPostCourseService;