import axios from 'axios';
import {API_BASE_URL} from '../constants/api';
import {ACCESS_TOKEN} from '../constants/auth';

;

const TaskService = {};

TaskService.getTask = async function (courseId, sectionId, taskId) {
    return axios({
        method: "get",
        url: API_BASE_URL + `/api/course/${courseId}/section/${sectionId}/task/${taskId}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

TaskService.getAllTasks = async function () {
    return axios({
        method: "get",
        url: API_BASE_URL + `/api/task/get`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

export default TaskService;