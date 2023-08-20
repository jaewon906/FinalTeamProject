import {Outlet, Route, Routes} from "react-router-dom";
import AdminLogin from "./component/ADMIN/AdminLogin";
import AdminTheme from "./component/ADMIN/AdminTheme";
import React from "react";
import ControlUserPage from "./component/ADMIN/ControlUserPage";
import AdminManage from "./component/ADMIN/AdminManage";
import UserManage from "./component/ADMIN/UserManage";

export default function App_Admin() {

    return (
        <Routes>
            <Route path={"/"} element={<Outlet/>}>
                <Route path={"admin/*"} element={<ControlUserPage/>}/>
                <Route path={"admin/"} element={<Outlet/>}>
                    <Route path={"login/"} element={<AdminLogin/>}/>
                    <Route path={"manage/"} element={<AdminTheme page={<AdminManage/>}/>}/>
                    <Route path={"manage/"} element={<Outlet/>}>
                        <Route path={"user/"} element={<AdminTheme page={<UserManage/>}/>}/>
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}