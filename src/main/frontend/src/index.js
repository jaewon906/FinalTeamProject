import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ScrollTop from "./js/ScrollTop";
import Header from "./component/USER/Header";
import TopBtn from "./component/USER/jw_topBtn";
import CategoryHeader from "./component/USER/CategoryHeader";
import Footer from "./component/USER/Footer";
import App_Admin from "./App_Admin";
import NotFound from "./component/USER/NotFound";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>

        <div id={"userOnly"} style={{width:"100vw", minWidth:"1280px", height:"auto", position:"relative"}}>
            <App/>
        </div>

        <div id={"adminOnly"} style={{width:"100vw", minWidth:"1024px", height:"auto", position:"relative"}}>
            <App_Admin/>
        </div>

    </BrowserRouter>
);

