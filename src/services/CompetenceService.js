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