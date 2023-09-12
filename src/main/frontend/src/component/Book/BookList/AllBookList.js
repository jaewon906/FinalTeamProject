import axios from "axios";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";
import Button from "../../../common/Button";
import "../../../css/ListPage/AllBookList.css";
import {Link} from "react-router-dom";
import Parser from "html-react-parser";
import DOMPurify from "dompurify";
import {getUserNumber} from "../../../js/getUserNumber";
import Loading from "../../../js/Loading";
import goToPurchase from "../../../js/goToPurchase";

function AllBookList() {
    const [allBookList, setAllBookList] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(true);
    const page = useRef(0);
    const [ref, inView] = useInView();
    const [isLoading, setIsLoading] = useState(true);

    const fetch = useCallback(async () => {
        try {
            const {data} = await axios.get(
                `/api/book/books?_limit=10&_page=${page.current}`
            );
            const modifiedData = data.map((book) => {
                const imgUrlArray = JSON.parse(book.previewImgList.replace(/\\/g, ""));
                return {
                    ...book,
                    previewImgList: imgUrlArray,
                };
            });

            // 데이터 가져오기가 완료되면 isLoading 상태를 false로 변경
            setTimeout(() => {
                setAllBookList((prevBook) => [...prevBook, ...modifiedData]);
                setHasNextPage(data.length === 10);

                if (data.length === 10) {
                    page.current += 1;
                }

                setIsLoading(false);
            }, 500);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        if (inView && hasNextPage) {
            fetch();
        }
    }, [fetch, hasNextPage, inView]);


    return (
        <div className="container1">
            <div className="main1">
                <ul className="all-book-list">
                    {isLoading ? (
                        <Loading/>
                    ) : (
                        <>
                            <h1>전체 도서</h1>
                            {allBookList.map((bookDetail, key) => {
                                const standardPrice = parseInt(bookDetail.priceStandard);
                                const salesPrice = parseInt(bookDetail.priceSales);

                                const formattedStdPrice = standardPrice.toLocaleString();
                                const formattedSalesPrice = salesPrice.toLocaleString();

                                const fullDesc = bookDetail.fullDescription || "";

                                return (
                                    <li className="book-list" key={key}>
                                        <div className="book-cover">
                                            {bookDetail.remain === "1" ?
                                                <Link to={`/home/bookdetail/${bookDetail.isbn13}`}>
                                                    <img
                                                        src={bookDetail.previewImgList[0]}
                                                        width="180px"
                                                        height="250px"
                                                        alt="book-cover"
                                                    />
                                                </Link> :
                                                <Link to={`/home/bookdetail/${bookDetail.isbn13}`}>
                                                    <img
                                                        src={bookDetail.previewImgList[0]}
                                                       style={{ width:"180px",height:"250px", opacity:"0.3"}}
                                                        alt="book-cover"
                                                    />
                                                </Link>
                                            }
                                        </div>
                                        <div className="info">
                                            <div className="book-title">
                                                <Link to={`/home/bookdetail/${bookDetail.isbn13}`}>
                                                    {Parser(DOMPurify.sanitize(bookDetail.title))}
                                                </Link>
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
                                                {Parser(
                                                    DOMPurify.sanitize(fullDesc.slice(0, 150)) +
                                                    (fullDesc.length > 150 ? "..." : "")
                                                )}
                                            </div>
                                        </div>
                                        <div className="cart-buy">
                                            {/* <div className="btn-cart">
                    <Button violet="true" fullWidth>장바구니 담기</Button>
                  </div> */}
                                            <div className="btn-buy">
                                                {bookDetail.remain === "1" ?
                                                    <Button
                                                        onClick={() => {
                                                            goToPurchase(bookDetail.isbn13);
                                                        }}
                                                        green="true"
                                                        style={{width: "100px", height: "45px"}}
                                                    >
                                                        구매하기
                                                    </Button> :
                                                    <Button
                                                        red="true"
                                                        style={{width: "100px", height: "45px"}}
                                                    >
                                                        품절
                                                    </Button>
                                                }
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </>
                    )}

                    <li ref={ref}></li>
                </ul>
            </div>
        </div>
    );
}

export default AllBookList;
