import axios from "axios";
import React, {useEffect, useState} from "react";
import Button from "../../common/Button";
import {Link} from "react-router-dom";
import Parser from 'html-react-parser';
import DOMPurify from 'dompurify';
import {getUserNumber} from "../../js/getUserNumber";

function FilteredBookList({category}) {
    const [filteredBookList, setFilteredBookList] = useState([]);


    useEffect(() => {
        axios
            .get("/api/bookdetail")
            .then((response) => {
                const modifiedData = response.data.map((book) => {
                    const imgUrlArray = JSON.parse(
                        book.previewImgList.replace(/\\/g, "")
                    );
                    return {
                        ...book,
                        previewImgList: imgUrlArray,
                    };
                });
                setFilteredBookList(modifiedData);
            })
            .catch((error) => {
                console.error("데이터를 가져오는데 실패했다 : ", error);
            });
    }, []);


    const goToPurchase =(isbn) =>{
        const userNumber = getUserNumber().userNumber;

        if(userNumber){
            const sessionStorage= window.sessionStorage;
            let item = sessionStorage.getItem(isbn);

            if(item){
                ++item;
                sessionStorage.setItem(isbn,item)
            }
            else{
                sessionStorage.setItem(isbn,1)
            }
            window.location.href="/home/purchase"
        }
        else {
            const ret = window.confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")
            if(ret){
                window.location.href="/home/logIn"
            }

        }

    }

    return (
        <div className="container1">
            <div className="main1">
                <ul className="all-book-list">
                    <h1>{category}</h1>
                    {filteredBookList
                        .filter((bookDetail) => {
                            if (bookDetail.categoryName) {
                                const categoryArray = bookDetail.categoryName.split(">");
                                const trimmedCategory = categoryArray[1].trim();
                                return trimmedCategory === category;
                            }
                            return false;
                        })
                        .map((bookDetail, key) => {
                            const standardPrice = parseInt(bookDetail.priceStandard);
                            const salesPrice = parseInt(bookDetail.priceSales);

                            const formattedStdPrice = standardPrice.toLocaleString();
                            const formattedSalesPrice = salesPrice.toLocaleString();

                            const fullDesc = bookDetail.fullDescription || "";

                            return (
                                <li className="book-list" key={key}>
                                    <div className="book-cover">
                                        <Link to={`/home/bookdetail/${bookDetail.isbn13}`}>
                                            <img
                                                src={bookDetail.previewImgList[0]}
                                                width="180px"
                                                height="250px"
                                                alt="book-cover"
                                            />
                                        </Link>
                                    </div>
                                    <div className="info">
                                        <div className="book-title">
                                            <Link
                                                to={`/home/bookdetail/${bookDetail.isbn13}`}>{Parser(DOMPurify.sanitize(bookDetail.title))}</Link>
                                        </div>
                                        <div className="author-pub">
                                            {bookDetail.author} · {bookDetail.publisher} ·{" "}
                                            {bookDetail.pubDate}
                                        </div>
                                        <div className="price">
                                            <span className="green">10%</span>{" "}
                                            <span className="sale-price">
                          {formattedSalesPrice}원
                        </span>{" "}
                                            <del>{formattedStdPrice}원</del>
                                        </div>
                                        <div className="desc">
                                            {Parser(DOMPurify.sanitize(fullDesc.slice(0, 150)) +
                                                (fullDesc.length > 150 ? "..." : "")
                                            )}
                                        </div>
                                    </div>
                                    <div className="cart-buy">
                                        {/* <div className="btn-cart">
                                            <Button violet="true" fullWidth>장바구니 담기</Button>
                                        </div> */}
                                        <div className="btn-buy">
                                            <Button onClick={()=>{goToPurchase(bookDetail.isbn13)}} green="true" fullWidth>구매하기</Button>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                </ul>
            </div>
        </div>
    );
}

export default FilteredBookList;
