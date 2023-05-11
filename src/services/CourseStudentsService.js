import axios from "axios";
import {API_BASE_URL} from "../constants/api";
import {ACCESS_TOKEN} from "../constants/auth";

const CourseStudentsService = {};

CourseStudentsService.getAllCourseStudents = async function (page, limit, id) {
    const response = await axios({
        method: "get",
        url: API_BASE_URL + `/api/course/${id}/get/students?page=${page - 1}&limit=${limit}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
    const data = response.data.list;
    const hasMore = response.data.hasMore;
    return { data, hasMore };
}


export default CourseStudentsService;