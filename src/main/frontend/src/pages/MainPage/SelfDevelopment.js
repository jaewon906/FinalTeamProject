import axios from "axios";
import React, {useEffect, useState} from "react";
import "../../css/MainPage/booksInfo.css";
import {Link} from "react-router-dom";

function SelfDevelopmentBook() {
    const [devBooksDetails, setDevBooksDetails] = useState([]);

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
                setDevBooksDetails(modifiedData);
            })
            .catch((error) => {
                console.error("데이터를 가져오는데 실패했다 : ", error);
            });
    }, []);

    const devBooksList = devBooksDetails.slice(223, 227);

    return (
        <div className="container">
            <h2 className="hot-item">자기계발은 언제나 옳다.</h2>
            <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                <ul className="hot-item-list">
                    {devBooksList.map((devBookDetail) => {
                        // 카테고리를 ">" 기준으로 잘라내서 보여준다.
                        const categoryArray = devBookDetail.categoryName.split(">");
                        const trimmedCategory = categoryArray[1].trim();

                        return (
                            <li key={devBookDetail.bookId}>
                                <Link to={`/home/bookdetail/${devBookDetail.isbn13}`}>
                                    <img
                                        src={devBookDetail.previewImgList[0]}
                                        alt="book_image"
                                        width="280px"
                                        height="400px"
                                    />
                                </Link>
                                <br/>
                                <br/>
                                <div className="book-info">
                                    <p className="category">{trimmedCategory}</p>
                                    <p className="book-title">
                                        <strong><Link
                                            to={`/home/bookdetail/${devBookDetail.isbn13}`}>{devBookDetail.title}</Link></strong>
                                    </p>
                                    <p className="author">
                                        <small>{devBookDetail.author}</small>
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
        ;
}

export default SelfDevelopmentBook;
