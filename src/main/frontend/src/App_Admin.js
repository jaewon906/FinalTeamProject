import {Outlet, Route, Routes} from "react-router-dom";
import AdminLogin from "./component/ADMIN/AdminLogin";
import AdminManageUser from "./component/ADMIN/AdminManageUser";
import {useEffect} from "react";

export default function App_Admin() {

    return (
        <Routes>
            <Route path={"admin/"} element={<Outlet/>}>
                <Route path={"login/"} element={<AdminLogin/>}/>
            </Route>
            <Route path={"manage/"} element={<Outlet/>}>
                <Route path={"user/"} element={<AdminManageUser/>}/>
            </Route>
        </Routes>
    )
}