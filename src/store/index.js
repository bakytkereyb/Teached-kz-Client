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
import courseStudents from "./slices/courseStudentsSlice"
import adminCoursesTableController from "./slices/tableController/AdminCoursersTableController"
import adminUsersTableController from "./slices/tableController/AdminUsersTableController"
import coursesTableController from "./slices/tableController/CoursesTableController"
import myCoursesTableController from "./slices/tableController/MyCoursesTableController"
import course from "./slices/course/courseSlice"
import chatUsersTableController from "./slices/tableController/ChatUsersTableController";
import task from "./slices/taskSlice";
import tasks from "./slices/tasksSlice";
import taskFiles from "./slices/taskFilesSlice";
import courseStudentsViewController from "./slices/tableController/CourseStudentsViewController";
import trainingCourses from "./slices/trainingCoursesSlice"
import trainingCoursesTableController from "./slices/tableController/TrainingCoursesTableController"

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
        courseStudentsViewController: courseStudentsViewController,
        task: task,
        tasks: tasks,
        taskFiles: taskFiles,
        courseStudents: courseStudents,
        trainingCourses: trainingCourses,
        trainingCoursesTableController: trainingCoursesTableController,
    },
});
