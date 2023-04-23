import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import publicUserReducer from "./slices/publicUserSlice";
export default configureStore({
    reducer: {
        user: userReducer,
        publicUser: publicUserReducer,
    },
});