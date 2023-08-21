import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import App_Admin from "./App_Admin";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>

        <div id={"userOnly"} style={{width:"100vw", minWidth:"1280px", height:"auto", position:"relative"}}>
            <App/>
        </div>

        <div id={"adminOnly"} style={{width:"100vw", minWidth:"1024px", minHeight:"768px", height:"100vh", position:"relative"}}>
            <App_Admin/>
        </div>

    </BrowserRouter>
);

