import {Outlet, Route, Routes} from 'react-router-dom'
import LogInPage from "./pages/LogInPage/LogInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import FindMyIdPage from "./pages/MyPage/FindMyIdPage";
import FindMyPwPage from "./pages/MyPage/FindMyPwPage";
import React from "react";
import Header from "./component/common/Header";
import CategoryHeader from "./component/common/CategoryHeader";
import TopBtn from "./js/jw_topBtn";
import ScrollTop from "./js/ScrollTop";
import Footer from "./component/common/Footer";
import MyPageAuth from "./pages/MyPage/MyPageAuth";
import BookListPage from "./pages/ListPage/index";
import BookDetailPage from "./pages/DetailPage/index";
import FilteredBookList from "./pages/FilteredBookPage/FilteredBookList";
import SearchResults from "./pages/SearchPage/index";
import MainPage from "./pages/MainPage/index";
import CartPage from './pages/CartPage';
import PurchasePage from "./pages/PurchasePage/PurchasePage";
import QnA_Page from "./pages/BoardPage/QnA_Page";
import QnA_CreateBoard from "./pages/BoardPage/QnA_CreateBoard";
import QnA_DetailBoard from "./pages/BoardPage/QnA_DetailBoard";
import QnA_UpdateBoard from "./pages/BoardPage/QnA_UpdateBoard";



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
                        <Route path={"board/"} element={<QnA_Page/>} />
                        <Route path={"board/create-board/"} element={<QnA_CreateBoard />} />
                        <Route path={"board/detail/:id"} element={<QnA_DetailBoard />} />
                        <Route path={"board/update-board/:id"} element={<QnA_UpdateBoard/>} />
                        <Route path="booklist" element={<BookListPage />}></Route>
                        <Route path="novels/" element={<FilteredBookList category="소설/시/희곡" />} />
                        <Route path="economics/" element={<FilteredBookList category="경제경영" />} />
                        <Route path="developments/" element={<FilteredBookList category="자기계발" />} />
                        <Route path="children/" element={<FilteredBookList category="어린이" />} />
                        <Route path="foreign/" element={<FilteredBookList category="외국어" />} />
                        <Route path="search/" element={<SearchResults />} />
                        <Route path="purchase/" element={<PurchasePage />} />
                        <Route path="purchase/" element={<Outlet />} >
                            <Route path="result/" element={<PurchaseResultPage />} />
                        </Route>
                        <Route path="bookdetail/:isbn13" element={<BookDetailPage />} />
                        <Route path="cart/" element={<CartPage />} />
                    </Route>

                </Route>
            </Routes>
            <ScrollTop/>
            <Footer/>
        </>

    );
}

export default App;
