import axios from "axios";
import {API_BASE_URL} from "../constants/api";
import {ACCESS_TOKEN} from "../constants/auth";

const ImageUploadService = {};

ImageUploadService.uploadProfileImage = async function (id, file) {
    let data = new FormData();
    data.append("imageFileName", file);
    return axios({
        method: "patch",
        url: API_BASE_URL + `/api/user/${id}/change/image`,
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    });
}

export default ImageUploadService;