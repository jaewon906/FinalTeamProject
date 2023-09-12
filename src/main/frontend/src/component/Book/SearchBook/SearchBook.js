import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import axios from "axios";
import Button from "../../../common/Button";
import {getUserNumber} from "../../../js/getUserNumber";
import goToPurchase from "../../../js/goToPurchase";

function SearchBook() {
    const [searchResults, setSearchResults] = useState([]);
    const usernumber = getUserNumber().usernumber;

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    let query = useQuery();
    const searchTerm = query.get("q");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchSearchBook(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    const fetchSearchBook = async (searchTerm) => {
        try {
            const response = await axios.get("/api/book/search", {
                params: {title: searchTerm},
            });
            console.log(response);
            const modifiedData = response.data.map((book) => {
                const imgUrlArray = JSON.parse(book.previewImgList.replace(/\\/g, ""));
                return {
                    ...book,
                    previewImgList: imgUrlArray,
                };
            });
            setSearchResults(modifiedData);

        } catch (error) {
            console.error(error);
            setSearchResults([]);
        }
    };


    console.log(searchResults)

    if (searchResults.length > 0) {
        return (
            <div className="container1">
                <div className="main1">
                    <ul className="all-book-list">
                        <h1>검색 결과({searchResults.length})</h1>

                        {searchResults.map((bookDetail, key) => {
                            const standardPrice = parseInt(bookDetail.priceStandard);
                            const salesPrice = parseInt(bookDetail.priceSales);

                            const formattedStdPrice = standardPrice.toLocaleString();
                            const formattedSalesPrice = salesPrice.toLocaleString();

                            return (
                                <>
                                    <li className="book-list" key={key}>
                                        <div className="book-cover">
                                            <Link to={`/home/bookdetail/${bookDetail.isbn13}/`}>
                                                {bookDetail.remain === "1" ?
                                                    <img
                                                        src={bookDetail.previewImgList[0]}
                                                        style={{width: "180px", height: "250px"}}
                                                        alt="book-cover"
                                                    /> :
                                                    <img
                                                        src={bookDetail.previewImgList[0]}
                                                        style={{width: "180px", height: "250px", opacity:"0.3"}}
                                                        alt="book-cover"
                                                    />
                                                }
                                            </Link>
                                        </div>
                                        <div className="info">
                                            <div className="book-title">
                                                <Link to={`/home/bookdetail/${bookDetail.isbn13}/`}>
                                                    {bookDetail.title}
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
                                                {bookDetail.fullDescription.length > 150
                                                    ? `${bookDetail.fullDescription.substring(
                                                        0,
                                                        150
                                                    )}......`
                                                    : bookDetail.fullDescription}
                                            </div>
                                        </div>
                                        <div className="cart-buy">
                                            <div className="btn-buy">
                                                {bookDetail.remain === "1" ? <Button
                                                        green="true"
                                                        fullWidth
                                                        onClick={() => {
                                                            goToPurchase(bookDetail.isbn13);
                                                        }}
                                                    >
                                                        구매하기
                                                    </Button> :
                                                    <Button
                                                        red="true"
                                                        fullWidth

                                                    >
                                                        품절
                                                    </Button>
                                                }
                                            </div>
                                        </div>
                                    </li>
                                </>
                            )
                                ;
                        })}
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className="no-results">
                    <p>
                        찾고자 하는 검색어 "{searchTerm}"에 맞는 상품이 없습니다.
                        <br/>
                        <span>
              맞춤법이 틀리지 않았는지 확인하거나 다른 검색어로 검색해 보세요.
            </span>
                    </p>
                </div>
            </>
        );
    }
}

export default SearchBook;