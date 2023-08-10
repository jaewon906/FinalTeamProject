import {Outlet, Route, Routes} from 'react-router-dom'
import MainPage from "./component/MainPage";
import LogInPage from "./component/LogInPage";
import SignUpPage from "./component/SignUpPage";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<MainPage/>}></Route>
            <Route path={"login/"} element={<LogInPage/>}></Route>
            <Route path={"signUp/"} element={<SignUpPage/>}></Route>
        </Routes>
    );
}

export default App;
