import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import publicUserReducer from "./slices/publicUserSlice";
import tabBlock from "./slices/tabBlock/tabBlockSlice";
export default configureStore({
    reducer: {
        user: userReducer,
        publicUser: publicUserReducer,
        tabBlock: tabBlock,
    },
});