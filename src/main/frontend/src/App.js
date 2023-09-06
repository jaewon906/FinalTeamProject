import {Outlet, Route, Routes} from 'react-router-dom'
import LogInPage from "./pages/LogInPage/LogInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import FindMyIdPage from "./pages/MyPage/FindMyIdPage";
import FindMyPwPage from "./pages/MyPage/FindMyPwPage";
import React from "react";
import Header from "./common/Header";
import CategoryHeader from "./common/CategoryHeader";
import TopBtn from "./js/jw_topBtn";
import ScrollTop from "./js/ScrollTop";
import Footer from "./common/Footer";
import MyPageAuth from "./pages/MyPage/MyPageAuth";
import BookListPage from "./pages/ListPage/index";
import BookDetailPage from "./pages/DetailPage/index";
import FilteredBookListPage from "./pages/FilteredBookPage/index";
import SearchResults from "./pages/SearchPage/index";
import MainPage from "./pages/MainPage/index";
import CartPage from './pages/CartPage';
import PurchasePage from "./pages/PurchasePage/PurchasePage";
import QnA_Page from "./pages/BoardPage/QnA_Page";
import QnA_CreateBoard from "./pages/BoardPage/QnA_CreateBoard";
import QnA_DetailBoard from "./pages/BoardPage/QnA_DetailBoard";
import QnA_UpdateBoard from "./pages/BoardPage/QnA_UpdateBoard";
import PurchaseResultPage from "./pages/PurchasePage/PruchaseResultPage";
import OrderDetailPage from "./pages/MyPage/OrderDetailPage";
import {useSelector} from "react-redux";
import {createGlobalStyle} from "styled-components";
import BookRegistPage from './pages/BookRegistPage';


function App() {

    const theme = useSelector(data => data.dataSet)
    const mode = theme.mode

    const GlobalStyle = createGlobalStyle`

      body {
        color: ${mode ? 'rgb(225,225,225)' : 'black'}
      }
      
      a{
        transition: color 0.3s ease;
        color: ${mode ? 'rgb(225,225,225)' : 'black'};
      }
      
    `
    const containerHeaderStyle={
        transition: 'background-color 0.3s ease',
        backgroundColor: mode ? 'rgb(30,31,33)':'white'
    }

    return (
        <>
            <GlobalStyle/>
            <Header style={containerHeaderStyle}/>
            <CategoryHeader/>
            <TopBtn/>
            <Routes>
                <Route path={"/"} element={<Outlet/>}>
                    <Route path={"home/"} element={<Outlet/>}>
                        <Route index element={<MainPage/>}/>
                        <Route path={"login/"} element={<LogInPage/>}/>
                        <Route path={"signUp/"} element={<SignUpPage/>}/>
                        <Route path={"findId/"} element={<FindMyIdPage/>}/>
                        <Route path={"findPw/"} element={<FindMyPwPage/>}/>
                        <Route path={"myPage/"} element={<MyPageAuth/>}/>
                        <Route path={"myPage/"} element={<Outlet/>}>
                            <Route path="orderDetail/:orderNumber" element={<OrderDetailPage/>}/>
                        </Route>
                        <Route path={"board/"} element={<QnA_Page/>} />
                        <Route path={"board/create-board/"} element={<QnA_CreateBoard />} />
                        <Route path={"board/detail/:id"} element={<QnA_DetailBoard />} />
                        <Route path={"board/update-board/:id"} element={<QnA_UpdateBoard/>} />
                        <Route path="booklist" element={<BookListPage />}></Route>
                        <Route path="novels/" element={<FilteredBookListPage category="소설/시/희곡" />} />
                        <Route path="economics/" element={<FilteredBookListPage category="경제경영" />} />
                        <Route path="developments/" element={<FilteredBookListPage category="자기계발" />} />
                        <Route path="children/" element={<FilteredBookListPage category="어린이" />} />
                        <Route path="foreign/" element={<FilteredBookListPage category="외국어" />} />
                        <Route path="search/" element={<SearchResults />} />
                        <Route path="regist/" element={<BookRegistPage />} />
                        <Route path="purchase/" element={<PurchasePage />} />
                        <Route path="purchase/" element={<Outlet />} >
                            <Route path=":userNumber" element={<PurchaseResultPage />} />
                        </Route>
                        <Route path="bookdetail/:isbn13" element={<BookDetailPage/>}/>
                        <Route path="cart/" element={<CartPage/>}/>
                    </Route>

                </Route>
            </Routes>
            <ScrollTop/>
            <Footer/>
        </>

    );
}

export default App;
