import {Outlet, Route, Routes} from 'react-router-dom'
import LogInPage from "./component/USER/LogInPage";
import SignUpPage from "./component/USER/SignUpPage";
import FindMyIdPage from "./component/USER/FindMyIdPage";
import FindMyPwPage from "./component/USER/FindMyPwPage";
import React from "react";
import Header from "./component/USER/Header";
import CategoryHeader from "./component/USER/CategoryHeader";
import TopBtn from "./js/jw_topBtn";
import ScrollTop from "./js/ScrollTop";
import Footer from "./component/USER/Footer";
import Main from "./component/USER/Main";
import MyPageAuth from "./component/USER/MyPageAuth";
import NotFound from "./js/NotFound";
import BookListPage from "./pages/ListPage/index";
import BookDetailPage from "./pages/DetailPage/index";
import FilteredBookList from "./component/FilteredBookList";
import SearchResults from "./pages/SearchPage/index";
import MainPage from "./pages/MainPage/index";


function App() {

    return (
        <>
            <Header/>
            <CategoryHeader/>
            <TopBtn/>
            <Routes>
                <Route path={"/"} element={<Outlet/>}>
                    <Route path={"home/"} element={<Outlet/>}>
                        <Route index element={<MainPage />} />
                        <Route path={"login/"} element={<LogInPage/>}/>
                        <Route path={"signUp/"} element={<SignUpPage/>}/>
                        <Route path={"findId/"} element={<FindMyIdPage/>}/>
                        <Route path={"findPw/"} element={<FindMyPwPage/>}/>
                        <Route path={"myPage/"} element={<MyPageAuth/>}/>
                    </Route>
                    <Route path="/booklist" element={<BookListPage />}></Route>
                    <Route path="novels/" element={<FilteredBookList category="소설/시/희곡" />} />
                    <Route path="economics/" element={<FilteredBookList category="경제경영" />} />
                    <Route path="developments/" element={<FilteredBookList category="자기계발" />} />
                    <Route path="children/" element={<FilteredBookList category="어린이" />} />
                    <Route path="foreign/" element={<FilteredBookList category="외국어" />} />
                    <Route path="search/" element={<SearchResults />} />
                    <Route path="bookdetail/:isbn13/" element={<BookDetailPage />} />
                </Route>
            </Routes>
            <ScrollTop/>
            <Footer/>
        </>

    );
}

export default App;
