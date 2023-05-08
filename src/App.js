import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import {BrowserRouter as Router, Navigate, Route, Routes, useLocation} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error";
import RegistrationPage from "./pages/RegistrationPage";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/Courses/CoursesPage";
import CoursePage from "./pages/CoursePage";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useLayoutEffect} from "react";
import {getUserByToken, setUser} from "./store/slices/userSlice";
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
                <Route path='/competence-map' element={user !== null ? <CompetenceMap/> : <Navigate to="/login" replace />}/>
                <Route path='/competence-bank' element={user !== null ? <CompetenceBank/> : <Navigate to="/login" replace />}/>
                <Route path='/questionnaire/:id/pass' element={user !== null ? <QuestionnairePass/> : <Navigate to="/login" replace />}/>
                <Route path='/course' element={user !== null ? <CoursePage/> : <Navigate to="/login" replace />}/>
                <Route path='/profile/:username' element={user !== null ? <ProfilePage/> : <Navigate to="/login" replace />}/>
                <Route path='/settings' element={user !== null ? <Settings/> : <Navigate to="/login" replace />}/>
                <Route path='/admin'>
                    <Route path='my' element={user !== null && user?.admin ? <AdminPage/> : <Navigate to="/login" replace /> }/>
                    <Route path='course' element={user !== null && user?.admin ? <AdminCourse/> : <Navigate to="/login" replace /> }/>
                    <Route path='users' element={user !== null && user?.admin ? <AdminUsers/> : <Navigate to="/login" replace /> }/>
                </Route>
                <Route path='*' element={<Error/>}/>
                <Route path='/logout' element={<Logout/>}/>
            </Routes>
        </Router>
    );
}

export default App;
