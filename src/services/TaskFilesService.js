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

TaskFilesService.submitFiles = async function (courseId, sectionId, taskId, fileNames) {
    let data = new FormData();
    data.append("fileNames", fileNames);
    return axios({
        method: "post",
        url: API_BASE_URL + `/api/course/${courseId}/section/${sectionId}/task/${taskId}/submit`,
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

TaskFilesService.gradeTaskByStudent = async function (courseId, sectionId, taskId, grade, comment, studentId) {
    let data = new FormData();
    data.append("grade", grade);
    data.append("comment", comment);
    data.append("studentId", studentId);
    return axios({
        method: "post",
        url: API_BASE_URL + `/api/course/${courseId}/section/${sectionId}/task/${taskId}/grade`,
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

export default TaskFilesService;