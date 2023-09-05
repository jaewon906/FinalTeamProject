import App from "./App";
import AppAdmin from "./AppAdmin";
import {Route, Routes} from "react-router-dom";
import AdminPageControl from "./js/AdminPageControl";
import React from "react";
import {useSelector} from "react-redux";

export default function Apps() {

    const theme = useSelector(data => data.dataSet)
    const mode = theme.mode
    const containerHeaderStyle = {

        transition: 'background-color 0.3s ease',
        backgroundColor: mode ? 'rgb(30,31,33)' : 'white',
        maxWidth: "100vw",
        minWidth: "1296px",
        height: "auto",
        minHeight:"100vh",
        position: "relative",
    }

    return (<>
        <div id={"userOnly"} style={containerHeaderStyle}>
            <App/>
        </div>

        <div id={"adminOnly"}
             style={{maxWidth: "100vw", minWidth: "1440px", height: "auto", position: "relative"}}>
            <AppAdmin/>
        </div>

        <Routes>
            <Route path={"/board/*"} element={<AdminPageControl/>}/>
            <Route path={"/book/*"} element={<AdminPageControl/>}/>
            <Route path={"/*"} element={<AdminPageControl/>}/>
        </Routes>
    </>)
};