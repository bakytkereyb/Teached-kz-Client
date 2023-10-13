import axios from "axios";
import {API_BASE_URL} from "../constants/api";

const UniversityService = {};
UniversityService.getAllUniversities = async function () {
    return axios({
        method: "get",
        url: API_BASE_URL + `/api/university/get`,
        headers: {
            "Content-Type": "application/json",
        }
    });
}
export default UniversityService;