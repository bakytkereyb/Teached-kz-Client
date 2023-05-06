import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import publicUserReducer from "./slices/publicUserSlice";
import tabBlock from "./slices/tabBlock/tabBlockSlice";
import competence from "./slices/competenceSlice";
import adminCourse from "./slices/admin/adminCourseSlice";
import trainersList from "./slices/trainerListSlice";
import adminUser from "./slices/admin/adminUserSlice"

export default configureStore({
    reducer: {
        user: userReducer,
        publicUser: publicUserReducer,
        tabBlock: tabBlock,
        competenceBank: competence,
        adminCourse: adminCourse,
        trainersList: trainersList,
        adminUser: adminUser,
    },
});