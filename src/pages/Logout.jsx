import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../store/slices/userSlice";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(setUser(null))
        localStorage.removeItem('Authorization');
        navigate("/login");
    }, [])

    return (
        <div>

        </div>
    );
};

export default Logout;