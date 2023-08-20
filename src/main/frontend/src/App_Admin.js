import {Outlet, Route, Routes} from "react-router-dom";
import AdminLogin from "./component/ADMIN/AdminLogin";
import AdminManage from "./component/ADMIN/AdminManage";
import React from "react";
import ControlUserPage from "./component/ADMIN/ControlUserPage";

export default function App_Admin() {

    return (
        <Routes>
            <Route path={"/"} element={<Outlet/>}>
                <Route path={"admin/*"} element={<ControlUserPage/>}/>
                <Route path={"admin/"} element={<Outlet/>}>
                    <Route path={"login/"} element={<AdminLogin/>}/>
                    <Route path={"manage/"} element={<AdminManage/>}/>
                </Route>
            </Route>
        </Routes>
    )
}