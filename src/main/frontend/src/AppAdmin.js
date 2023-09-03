import {Outlet, Route, Routes} from "react-router-dom";
import AdminLogin from "./pages/AdminPage/AdminLogin";
import AdminTheme from "./pages/AdminPage/AdminTheme";
import React from "react";
import AdminManage from "./pages/AdminPage/AdminManage";
import UserManage from "./pages/AdminPage/UserManage";
import NotFound from "./js/NotFound";
import OrderManage from "./pages/AdminPage/OrderManage";

export default function AppAdmin() {

    return (
        <Routes>
            <Route path={"/*"} element={<NotFound/>}/>
            <Route path={"/"} element={<Outlet/>}/>
            <Route path={"admin/"} element={<Outlet/>}>
                <Route path={"login/"} element={<AdminLogin/>}/>
                <Route path={"manage/"} element={<AdminTheme page={<AdminManage/>}/>}/>
                <Route path={"manage/"} element={<Outlet/>}>
                    <Route path={"user/"} element={<AdminTheme page={<UserManage/>}/>}/>
                    <Route path={"order/"} element={<AdminTheme page={<OrderManage/>}/>}/>
                </Route>
            </Route>
        </Routes>
    )
}