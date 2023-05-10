import axios from "axios";
import {API_BASE_URL} from "../constants/api";
import {ACCESS_TOKEN} from "../constants/auth";

const CourseService = {};

CourseService.getAllPublicCourses = async function (page, limit) {
    const response = await axios({
        method: "get",
        url: API_BASE_URL + `/api/course/get?page=${page - 1}&limit=${limit}&status=PUBLIC`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
    const data = response.data.list;
    const hasMore = response.data.hasMore;
    return { data, hasMore };
}

CourseService.getAllMyCourses = async function (page, limit) {
    const response = await axios({
        method: "get",
        url: API_BASE_URL + `/api/course/get/my?page=${page - 1}&limit=${limit}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
    const data = response.data.list;
    const hasMore = response.data.hasMore;
    return { data, hasMore };
}

CourseService.getCourseById = async function (id) {
     return axios({
        method: "get",
        url: API_BASE_URL + `/api/course/get/${id}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

CourseService.addSectionToCourseById = async function (id, sectionName) {
    let data = new FormData();
    data.append("name", sectionName);

    return axios({
        method: "post",
        url: API_BASE_URL + `/api/course/${id}/add/section`,
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

CourseService.removeSectionByIdFromCourseById = async function (id, sectionId) {
    return axios({
        method: "delete",
        url: API_BASE_URL + `/api/course/${id}/delete/section/${sectionId}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

CourseService.addFileToSection = async function (sectionId, label, fileName) {
    let data = new FormData();
    data.append("label", label);
    data.append("fileName", fileName);
    return axios({
        method: "post",
        url: API_BASE_URL + `/api/course/section/${sectionId}/add/file`,
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

CourseService.removeFileToSection = async function (sectionId, fileId) {
    return axios({
        method: "post",
        url: API_BASE_URL + `/api/course/section/${sectionId}/remove/file/${fileId}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

CourseService.registerUserToCourse = async function (id) {
    return axios({
        method: "post",
        url: API_BASE_URL + `/api/course/${id}/register`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

export default CourseService;