import {Outlet, Route, Routes} from "react-router-dom";
import AdminLogin from "./pages/AdminPage/AdminLogin";
import AdminTheme from "./pages/AdminPage/AdminTheme";
import React from "react";
import AdminManage from "./pages/AdminPage/AdminManage";
import UserManage from "./pages/AdminPage/UserManage";
import NotFound from "./js/NotFound";
import OrderManage from "./pages/AdminPage/OrderManage";
import OrderManageDetail from "./pages/AdminPage/OrderManageDetail";
import ProductManage from "./pages/AdminPage/ProductManage";
import RegisterBook from "./pages/AdminPage/RegisterBook";

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
                    <Route path={"product/"} element={<AdminTheme page={<ProductManage/>}/>}/>
                    <Route path={"product/"} element={<Outlet/>}>
                        <Route path={"register/"} element={<AdminTheme page={<RegisterBook/>}/>}></Route>
                    </Route>
                    <Route path={"orderDetail/:orderNumber"} element={<AdminTheme page={<OrderManageDetail/>}/>}/>
                </Route>
            </Route>
        </Routes>
    )
}