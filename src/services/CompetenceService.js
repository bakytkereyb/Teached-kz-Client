import axios from "axios";
import {API_BASE_URL} from "../constants/api";
import {ACCESS_TOKEN} from "../constants/auth";

const CompetenceService = {};

CompetenceService.getCompetenceBank = async function () {

    return axios({
        method: "get",
        url: API_BASE_URL + "/api/competence-bank/get",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

CompetenceService.getCompetenceBankByUserId = async function (id) {

    return axios({
        method: "get",
        url: API_BASE_URL + `/api/competence-bank/get/user/${id}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

CompetenceService.getQuestionnaireById = async function (id) {

    return axios({
        method: "get",
        url: API_BASE_URL + `/api/questionnaire-bank/get/${id}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

CompetenceService.deleteComponentById = async function (id) {

    return axios({
        method: "delete",
        url: API_BASE_URL + `/api/component-bank/delete/${id}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

CompetenceService.deleteQuestionnaireById = async function (id) {

    return axios({
        method: "delete",
        url: API_BASE_URL + `/api/questionnaire-bank/delete/${id}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

CompetenceService.passQuestionnaireById = async function (id, data) {

    return axios({
        method: "post",
        url: API_BASE_URL + `/api/questionnaire-bank/${id}/pass`,
        data: data,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

CompetenceService.createComponentBank = async function (name, nameKz, nameRu) {

    let data = new FormData();
    data.append("name", name);
    data.append("nameKz", nameKz);
    data.append("nameRu", nameRu);

    return axios({
        method: "post",
        url: API_BASE_URL + "/api/component-bank/save",
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

CompetenceService.createAnketaBank = async function (data, componentId) {

    return axios({
        method: "post",
        url: API_BASE_URL + `/api/questionnaire-bank/save?componentId=${componentId}`,
        data: data,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

export default CompetenceService;