import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomeAddress from "./js/HomeAddress";
import {Provider, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import combineReducers from "./js/combineReducers";
import Apps from "./Apps";

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
    reducer:combineReducers
})

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <HomeAddress/>
            <Apps/>
        </BrowserRouter>
    </Provider>
);

