import {Outlet, Route, Routes} from "react-router-dom";
import AdminLogin from "./component/ADMIN/AdminLogin";
import AdminManage from "./component/ADMIN/AdminManage";
import React, {useEffect} from "react";
import ControllUserPage from "./component/ADMIN/ControllUserPage";
import NotFound from "./component/USER/NotFound";

export default function App_Admin() {

    return (
        <Routes>
            <Route path={"/*"} element={<NotFound/>}/>
            <Route path={"/admin"} element={<ControllUserPage/>}/>
            <Route path={"/admin"} element={<Outlet/>}>
                <Route path={"login/"} element={<AdminLogin/>}/>
                <Route path={"manage/"} element={<AdminManage/>}/>
            </Route>
        </Routes>
    )
}