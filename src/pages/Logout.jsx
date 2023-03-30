import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import {setUser} from "../store/userSlice";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(setUser(null))
        Cookies.remove('Authorization');
        navigate("/login");
    }, [])

    return (
        <div>

        </div>
    );
};

export default Logout;