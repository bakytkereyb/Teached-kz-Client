import axios from "axios";
import {API_BASE_URL} from "../constants/api";
import {ACCESS_TOKEN} from "../constants/auth";

const FileUploaderService = {};

FileUploaderService.uploadFile = async function (file) {
    let data = new FormData();
    data.append("file", file);

    return axios({
        method: "post",
        url: API_BASE_URL + `/api/file/upload`,
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

export default FileUploaderService;