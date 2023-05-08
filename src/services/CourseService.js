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

export default CourseService;