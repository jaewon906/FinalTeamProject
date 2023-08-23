import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AppAdmin from "./AppAdmin";
import AdminPageControl from "./js/AdminPageControl";
import HomeAddress from "./js/HomeAddress";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <HomeAddress/>

        <div id={"userOnly"} style={{width: "100vw", minWidth: "1296px", height: "auto", position: "relative"}}>
            <App/>
        </div>

        <div id={"adminOnly"}
             style={{width: "100vw", minWidth: "1296px", minHeight: "768px", height: "118vh", position: "relative"}}>
            <AppAdmin/>
        </div>

        <Routes>
            <Route path={"/board/*"} element={<AdminPageControl/>}/>
            <Route path={"/book/*"} element={<AdminPageControl/>}/>
            <Route path={"/home/*"} element={<AdminPageControl/>}/>
        </Routes>

    </BrowserRouter>
);

