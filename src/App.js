import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error";
import RegistrationPage from "./pages/RegistrationPage";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import CoursePage from "./pages/CoursePage";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUserByToken, setUser} from "./store/slices/userSlice";
import Logout from "./pages/Logout";
import FullLoading from "./components/LoadingComponents/FullLoading";

function App() {
    const dispatch = useDispatch();
    const {user, isLoading} = useSelector(state => state.user);
    useEffect(() => {
        dispatch(getUserByToken());
    }, []);

    if (isLoading) {
        return <FullLoading/>;
    }

    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/login' element={user === null ? <LoginPage/> : <Navigate to="/my" replace />}/>
                <Route path='/register' element={user === null ? <RegistrationPage/> : <Navigate to="/my" replace />}/>
                <Route path='/my' element={user !== null ? <DashboardPage/> : <Navigate to="/login" replace />}/>
                <Route path='/courses' element={user !== null ? <CoursesPage/> : <Navigate to="/login" replace />}/>
                <Route path='/course' element={user !== null ? <CoursePage/> : <Navigate to="/login" replace />}/>
                <Route path='*' element={<Error/>}/>
                <Route path='/logout' element={<Logout/>}/>
            </Routes>
        </Router>
    );
}

export default App;
