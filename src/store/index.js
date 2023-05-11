import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import publicUserReducer from "./slices/publicUserSlice";
import tabBlock from "./slices/tabBlock/tabBlockSlice";
import competence from "./slices/competenceSlice";
import publicCompetence from "./slices/publicCompetenceSlice";
import adminCourse from "./slices/admin/adminCourseSlice";
import courses from "./slices/coursesSlice";
import trainersList from "./slices/trainerListSlice";
import adminUser from "./slices/admin/adminUserSlice"
import questionnaire from "./slices/anketaSlice"
import adminCoursesTableController from "./slices/tableController/AdminCoursersTableController"
import adminUsersTableController from "./slices/tableController/AdminUsersTableController"
import coursesTableController from "./slices/tableController/CoursesTableController"
import myCoursesTableController from "./slices/tableController/MyCoursesTableController"
import course from "./slices/course/courseSlice"
import chatUsersTableController from "./slices/tableController/ChatUsersTableController";
import task from "./slices/taskSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        publicUser: publicUserReducer,
        tabBlock: tabBlock,
        competenceBank: competence,
        publicCompetenceBank: publicCompetence,
        adminCourse: adminCourse,
        courses: courses,
        trainersList: trainersList,
        adminUser: adminUser,
        questionnaire: questionnaire,
        adminCoursesTableController: adminCoursesTableController,
        adminUsersTableController: adminUsersTableController,
        coursesTableController: coursesTableController,
        myCoursesTableController: myCoursesTableController,
        course: course,
        chatUsersTableController: chatUsersTableController,
        task: task,
    },
});
