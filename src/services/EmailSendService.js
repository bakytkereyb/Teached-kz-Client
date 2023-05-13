import axios from 'axios';
import {API_BASE_URL} from '../constants/api';
import {ACCESS_TOKEN} from '../constants/auth';

const EmailSendService = {};

EmailSendService.sendEmailConfirmation = async function (id, email) {
    let data = new FormData();
    data.append("email", email);

    return axios({
        method: "post",
        url: API_BASE_URL + `/api/user/${id}/send/confirmation`,
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

export default EmailSendService;