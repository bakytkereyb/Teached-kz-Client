import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error";
import RegistrationPage from "./pages/RegistrationPage";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import CoursePage from "./pages/CoursePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegistrationPage/>}/>
                <Route path='/my' element={<DashboardPage/>}/>
                <Route path='/courses' element={<CoursesPage/>}/>
                <Route path='/course' element={<CoursePage/>}/>
                <Route path='*' element={<Error/>}/>
            </Routes>
        </Router>
    );
}

export default App;
