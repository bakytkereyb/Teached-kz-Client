import HomePage from "./pages/HomePage";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error";
import RegistrationPage from "./pages/RegistrationPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import CoursesPage from "./pages/Courses/CoursesPage";
import CoursePage from "./pages/Course/CoursePage";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getUserByToken} from "./store/slices/userSlice";
import Logout from "./pages/Logout";
import FullLoading from "./components/LoadingComponents/FullLoading";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Settings from "./pages/Settings";
import AdminPage from "./pages/admin/AdminPage";
import {NotificationContainer} from "react-notifications";
import AdminCourse from "./pages/admin/AdminCourse/AdminCourse";
import AdminUsers from "./pages/admin/AdminUsers/AdminUsers";
import CompetenceMap from "./pages/CompetenceMap/CompetenceMap";
import CompetenceBank from "./pages/CompetenceBank/CompetenceBank";
import QuestionnairePass from "./pages/Questionnaire/QuestionnairePass";
import PublicCompetenceMap from "./pages/CompetenceMap/PublicCompetenceMap";
import QuestionnaireView from "./pages/Questionnaire/QuestionnaireView";
import CalendarPage from "./pages/Calendar/CalendarPage";
import CourseView from "./pages/Course/CourseView/CourseView";
import MyCoursesPage from './pages/MyCourses/MyCoursesPage';
import ChatList from "./pages/Chat/ChatList";
import TaskPage from './pages/Task/TaskPage';
import TaskPagePrivate from './pages/Task/TaskPagePrivate/TaskPagePrivate';
import PostCourses from './pages/PostCourses/PostCourses';
import AdminPostCourse from './pages/admin/PostCourse/AdminPostCourse';
import PostCourseView from './pages/PostCourse/PostCourseView/PostCourseView';
import PostCoursePage from './pages/PostCourse/PostCoursePage';
import MyPostCourses from './pages/MyPostCourses/MyPostCourses';
import TrainingCourses from "./pages/TrainingCourses/TrainingCourses";
import Tasks from "./pages/Tasks/Tasks";
import ChatPage from './pages/Chat/ChatPage';
import Application from "./pages/Applications/Application";
import AdminApplication from "./pages/admin/AdminApplications/AdminApplication";
import AnalyticsPage from './pages/admin/Analytics/AnalyticsPage';

function App() {
    const {user, isLoading} = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserByToken());
    }, []);

    if (isLoading) {
        return <FullLoading/>;
    }

    return (
        <Router>
            <NotificationContainer/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/login' element={user === null ? <LoginPage/> : <Navigate to="/my" replace />}/>
                <Route path='/register' element={user === null ? <RegistrationPage/> : <Navigate to="/my" replace />}/>
                <Route path='/my' element={user !== null ? <DashboardPage/> : <Navigate to="/login" replace />}/>
                <Route path='/courses' element={user !== null ? <CoursesPage/> : <Navigate to="/login" replace />}/>
                <Route path='/post-courses' element={user !== null ? <PostCourses/> : <Navigate to="/login" replace />}/>
                <Route path='/courses/my' element={user !== null ? <MyCoursesPage/> : <Navigate to="/login" replace />}/>
                <Route path='/post-courses/my' element={user !== null ? <MyPostCourses/> : <Navigate to="/login" replace />}/>
                <Route path='/chats' element={user !== null ? <ChatList/> : <Navigate to="/login" replace/>}/>
                <Route path='/chat/:id' element={user !== null ? <ChatPage/> : <Navigate to="/login" replace/>}/>
                <Route path='/tasks' element={user !== null ? <Tasks/> : <Navigate to="/login" replace/>}/>
                <Route path='/application' element={user !== null ? <Application/> : <Navigate to="/login" replace/>}/>
                <Route path='/calendar' element={user !== null ? <CalendarPage/> : <Navigate to="/login" replace/>}/>
                <Route path='/competence-map'
                       element={user !== null ? <CompetenceMap/> : <Navigate to="/login" replace />}/>
                <Route path='/competence-map/:id'
                       element={user !== null ? <PublicCompetenceMap/> : <Navigate to="/login" replace />}/>
                <Route path='/competence-bank'
                       element={user !== null ? <CompetenceBank/> : <Navigate to="/login" replace />}/>
                <Route path='/questionnaire/:id/pass'
                       element={user !== null ? <QuestionnairePass/> : <Navigate to="/login" replace />}/>
                <Route path='/questionnaire/:id/view'
                       element={user !== null ? <QuestionnaireView/> : <Navigate to="/login" replace />}/>
                <Route path='/course/:id/' element={user !== null ? <CoursePage/> : <Navigate to="/login" replace />}/>
                <Route path='/post-course/:id/' element={user !== null ? <PostCoursePage/> : <Navigate to="/login" replace />}/>
                <Route path='/course/:id/section/:sectionId/task/:taskId'
                       element={user !== null ? <TaskPage/> : <Navigate to="/login" replace/>}/>
                <Route path='/course/:id/section/:sectionId/task/:taskId/private' element={user !== null ?
                    (user.admin || user.trainer) ? <TaskPagePrivate/> : <Navigate to="/my" replace/>
                    :
                    <Navigate to="/my" replace/>
                }/>
                <Route path='/course/:id/view' element={user !== null ?
                    (user.admin || user.trainer) ? <CourseView/> : <Navigate to="/my" replace/>
                    :
                    <Navigate to="/my" replace/>
                }/>
                <Route path='/post-course/:id/view' element={user !== null ?
                    (user.admin) ?  <PostCourseView/> : <Navigate to="/my" replace />
                    :
                    <Navigate to="/my" replace />
                }/>
                <Route path='/trainingCourses' element={user !== null ?
                    (user.trainer) ? <TrainingCourses/> : <Navigate to="/my" replace/>
                    :
                    <Navigate to="/my" replace/>
                }/>
                <Route path='/profile/:username'
                       element={user !== null ? <ProfilePage/> : <Navigate to="/login" replace />}/>
                <Route path='/settings' element={user !== null ? <Settings/> : <Navigate to="/login" replace />}/>
                <Route path='/admin'>
                    <Route path='my' element={user !== null && user?.admin ? <AdminPage/> : <Navigate to="/login" replace /> }/>
                    <Route path='course' element={user !== null && user?.admin ? <AdminCourse/> : <Navigate to="/login" replace /> }/>
                    <Route path='post-course' element={user !== null && user?.admin ? <AdminPostCourse/> : <Navigate to="/login" replace /> }/>
                    <Route path='users' element={user !== null && user?.admin ? <AdminUsers/> : <Navigate to="/login" replace /> }/>
                    <Route path='applications' element={user !== null && user?.admin ? <AdminApplication/> : <Navigate to="/login" replace /> }/>
                    <Route path='analytics' element={user !== null && user?.admin ? <AnalyticsPage/> : <Navigate to="/login" replace /> }/>
                </Route>
                <Route path='*' element={<Error/>}/>
                <Route path='/logout' element={<Logout/>}/>
            </Routes>
        </Router>
    );
}

export default App;
