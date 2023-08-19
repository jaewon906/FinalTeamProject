import {Outlet, Route, Routes} from 'react-router-dom'
import LogInPage from "./component/USER/LogInPage";
import SignUpPage from "./component/USER/SignUpPage";
import MyPage from "./component/USER/MyPage";
import FindMyIdPage from "./component/USER/FindMyIdPage";
import FindMyPwPage from "./component/USER/FindMyPwPage";
import React from "react";
import ControlAdminPage from "./component/USER/ControlAdminPage";
import Header from "./component/USER/Header";
import CategoryHeader from "./component/USER/CategoryHeader";
import TopBtn from "./component/USER/jw_topBtn";
import ScrollTop from "./js/ScrollTop";
import Footer from "./component/USER/Footer";
import Main from "./component/USER/Main";


function App() {

    return (
        <>
            <Header/>
            <CategoryHeader/>
            <TopBtn/>
            <Routes>
                <Route path={"/"} element={<Main/>}/>
                <Route path={"/"} element={<Outlet/>}>
                    <Route path={"home/*"} element={<ControlAdminPage/>}/>
                    <Route path={"home/"} element={<Outlet/>}>
                        <Route path={"login/"} element={<LogInPage/>}/>
                        <Route path={"signUp/"} element={<SignUpPage/>}/>
                        <Route path={"findId/"} element={<FindMyIdPage/>}/>
                        <Route path={"findPw/"} element={<FindMyPwPage/>}/>
                        <Route path={"myPage/"} element={<MyPage/>}/>
                    </Route>
                </Route>
            </Routes>
            <ScrollTop/>
            <Footer/>
        </>

    );
}

export default App;
