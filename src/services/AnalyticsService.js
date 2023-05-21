import axios from 'axios';
import {API_BASE_URL} from '../constants/api';
import {ACCESS_TOKEN} from '../constants/auth';

const AnalyticsService = {};

AnalyticsService.getUserAnalytics = async function (id) {
    return axios({
        method: "get",
        url: API_BASE_URL + `/api/analytics/users`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

AnalyticsService.getCompetenceBankAnalytics = async function (id) {
    return axios({
        method: "get",
        url: API_BASE_URL + `/api/analytics/competence-bank`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

AnalyticsService.getCourseAnalyticsById = async function (id) {
    return axios({
        method: "get",
        url: API_BASE_URL + `/api/analytics/course/${id}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

export default AnalyticsService;