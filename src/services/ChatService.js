import axios from 'axios';
import {API_BASE_URL} from '../constants/api';
import {ACCESS_TOKEN} from '../constants/auth';

const ChatService = {};
ChatService.getAllMyChats = async function (page, limit) {
    const response = await axios({
        method: "get",
        url: API_BASE_URL + `/api/chat/get/my?page=${page - 1}&limit=${limit}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
    const data = response.data.list;
    const hasMore = response.data.hasMore;
    return { data, hasMore };
}

ChatService.saveChat = async function (userID) {
    let data = new FormData();
    data.append("userID", userID);
    return axios({
        method: "post",
        url: API_BASE_URL + `/api/chat/save`,
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

ChatService.sendMessageToChat = async function (id, message) {
    let data = new FormData();
    data.append("message", message);
    return axios({
        method: "post",
        url: API_BASE_URL + `/api/chat/${id}/send/message`,
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

ChatService.getChatById = async function (id) {
    return axios({
        method: "get",
        url: API_BASE_URL + `/api/chat/get/${id}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

export default ChatService;