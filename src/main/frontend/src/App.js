import {Outlet, Route, Routes} from 'react-router-dom'
import MainPage from "./component/MainPage";
import LogInPage from "./component/LogInPage";
import SignUpPage from "./component/SignUpPage";
import MyPage from "./component/MyPage";
import MyPageAuth from "./component/MyPageAuth";
import TopBtn from "./component/jw_topBtn";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<MainPage/>}></Route>
            <Route path={"login/"} element={<LogInPage/>}></Route>
            <Route path={"signUp/"} element={<SignUpPage/>}></Route>
            <Route path={"myPage/"} element={<MyPage/>}></Route>
            <Route path={"myPage/"} element={<MyPageAuth/>}></Route>
        </Routes>
    );
}

export default App;
