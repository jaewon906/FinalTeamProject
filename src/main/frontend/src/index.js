import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import ScrollTop from "./js/ScrollTop";
import Header from "./component/Header";
import MainPage from "./component/MainPage";
import TopBtn from "./component/jw_topBtn";
import CategoryHeader from "./component/CategoryHeader";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <div style={{width:"100vw", height:"auto", position:"relative"}}>
            <Header/>
            <CategoryHeader/>
            <TopBtn/>
            <MainPage/>
            <App/>
            <ScrollTop/>
        </div>
    </BrowserRouter>
);

