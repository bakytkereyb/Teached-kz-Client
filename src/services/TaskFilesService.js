import axios from 'axios';
import {API_BASE_URL} from '../constants/api';
import {ACCESS_TOKEN} from '../constants/auth';

const TaskFilesService = {};

TaskFilesService.getTask = async function (studentId, taskId) {
    return axios({
        method: "get",
        url: API_BASE_URL + `/api/task-files/get/task/${taskId}/student/${studentId}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

export default TaskFilesService;