import {Outlet, Route, Routes} from 'react-router-dom'
import LogInPage from "./component/USER/LogInPage";
import SignUpPage from "./component/USER/SignUpPage";
import MyPage from "./component/USER/MyPage";
import FindMyIdPage from "./component/USER/FindMyIdPage";
import FindMyPwPage from "./component/USER/FindMyPwPage";
import AdminLogin from "./component/ADMIN/AdminLogin";
import AdminManageUser from "./component/ADMIN/AdminManageUser";
import {useEffect} from "react";
import Main from "./component/USER/Main";


function App() {

    return (
        <Routes>
            <Route path={"/"} element={<Main/>}/>
            <Route path={"/"} element={<Outlet/>}>
                <Route path={"login/"} element={<LogInPage/>}/>
                <Route path={"signUp/"} element={<SignUpPage/>}/>
                <Route path={"findId/"} element={<FindMyIdPage/>}/>
                <Route path={"findPw/"} element={<FindMyPwPage/>}/>
                <Route path={"myPage/"} element={<MyPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
