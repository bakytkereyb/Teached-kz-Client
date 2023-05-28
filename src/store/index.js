import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import publicUserReducer from "./slices/publicUserSlice";
import tabBlock from "./slices/tabBlock/tabBlockSlice";
import competence from "./slices/competenceSlice";
import publicCompetence from "./slices/publicCompetenceSlice";
import adminCourse from "./slices/admin/adminCourseSlice";
import adminPostCourse from "./slices/admin/adminPostCourseSlice";
import courses from "./slices/coursesSlice";
import postCourses from "./slices/postCoursesSlice";
import trainersList from "./slices/trainerListSlice";
import adminUser from "./slices/admin/adminUserSlice"
import questionnaire from "./slices/anketaSlice"
import courseStudents from "./slices/courseStudentsSlice"
import postCourseStudents from "./slices/postCourseStudentsSlice"
import adminCoursesTableController from "./slices/tableController/AdminCoursersTableController"
import adminUsersTableController from "./slices/tableController/AdminUsersTableController"
import coursesTableController from "./slices/tableController/CoursesTableController"
import myCoursesTableController from "./slices/tableController/MyCoursesTableController"
import course from "./slices/course/courseSlice"
import postCourse from "./slices/postCourse/postCourseSlice"
import chatUsersTableController from "./slices/tableController/ChatUsersTableController";
import task from "./slices/taskSlice";
import tasks from "./slices/tasksSlice";
import applications from "./slices/applicationSlice"
import adminApplications from "./slices/admin/adminApplicationSlice"
import taskFiles from "./slices/taskFilesSlice";
import courseStudentsViewController from "./slices/tableController/CourseStudentsViewController";
import trainingCourses from "./slices/trainingCoursesSlice"
import trainingCoursesTableController from "./slices/tableController/TrainingCoursesTableController"
import chats from "./slices/chat/chatsSlice"
import chat from "./slices/chat/chatSlice"
import myChatsTableController from './slices/tableController/MyChatsTableController';
import applicationsTableController from "./slices/tableController/ApplicationsTableController";
import adminApplicationsTableController from "./slices/tableController/AdminApplicationsTableController";
import analytics from "./slices/admin/analyticsSlice";
import adminPublicCourses from "./slices/admin/AdminPublicCoursesSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        publicUser: publicUserReducer,
        tabBlock: tabBlock,
        competenceBank: competence,
        publicCompetenceBank: publicCompetence,
        adminCourse: adminCourse,
        adminPostCourse: adminPostCourse,
        courses: courses,
        post_courses: postCourses,
        trainersList: trainersList,
        adminUser: adminUser,
        questionnaire: questionnaire,
        adminCoursesTableController: adminCoursesTableController,
        adminUsersTableController: adminUsersTableController,
        coursesTableController: coursesTableController,
        myCoursesTableController: myCoursesTableController,
        course: course,
        postCourse: postCourse,
        chatUsersTableController: chatUsersTableController,
        courseStudentsViewController: courseStudentsViewController,
        task: task,
        tasks: tasks,
        taskFiles: taskFiles,
        courseStudents: courseStudents,
        postCourseStudents: postCourseStudents,
        trainingCourses: trainingCourses,
        trainingCoursesTableController: trainingCoursesTableController,
        applications: applications,
        adminApplications: adminApplications,
        applicationsTableController: applicationsTableController,
        adminApplicationsTableController: adminApplicationsTableController,
        myChatsTableController: myChatsTableController,
        chats: chats,
        chat: chat,
        analytics: analytics,
        adminPublicCourses: adminPublicCourses,
    },
});
