import axios from 'axios';
import {API_BASE_URL} from '../constants/api';
import {ACCESS_TOKEN} from '../constants/auth';
const PostCourseService = {};

PostCourseService.getAllPostCourseStudents = async function (page, limit, id) {
    const response = await axios({
        method: "get",
        url: API_BASE_URL + `/api/post-course/${id}/get/students?page=${page - 1}&limit=${limit}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
    const data = response.data.list;
    const hasMore = response.data.hasMore;
    return { data, hasMore };
}

PostCourseService.getPostCourseById = async function (id) {
    return axios({
        method: "get",
        url: API_BASE_URL + `/api/post-course/get/${id}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

PostCourseService.addSectionToPostCourseById = async function (id, sectionName) {
    let data = new FormData();
    data.append("name", sectionName);

    return axios({
        method: "post",
        url: API_BASE_URL + `/api/post-course/${id}/add/section`,
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

PostCourseService.removeSectionByIdFromPostCourseById = async function (id, sectionId) {
    return axios({
        method: "delete",
        url: API_BASE_URL + `/api/post-course/${id}/delete/section/${sectionId}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

PostCourseService.addFileToSection = async function (sectionId, label, fileName) {
    let data = new FormData();
    data.append("label", label);
    data.append("fileName", fileName);
    return axios({
        method: "post",
        url: API_BASE_URL + `/api/post-course/section/${sectionId}/add/file`,
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}
PostCourseService.removeFileToSection = async function (sectionId, fileId) {
    return axios({
        method: "post",
        url: API_BASE_URL + `/api/post-course/section/${sectionId}/remove/file/${fileId}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

PostCourseService.getAllPublicPostCourses = async function (page, limit) {
    const response = await axios({
        method: "get",
        url: API_BASE_URL + `/api/post-course/get?page=${page - 1}&limit=${limit}&status=PUBLIC`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
    const data = response.data.list;
    const hasMore = response.data.hasMore;
    return { data, hasMore };
}

PostCourseService.registerUserToPostCourse = async function (id) {
    return axios({
        method: "post",
        url: API_BASE_URL + `/api/post-course/${id}/register`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

PostCourseService.getAllMyPostCourses = async function (page, limit) {
    const response = await axios({
        method: "get",
        url: API_BASE_URL + `/api/post-course/get/my?page=${page - 1}&limit=${limit}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
    const data = response.data.list;
    const hasMore = response.data.hasMore;
    return { data, hasMore };
}

export default PostCourseService;