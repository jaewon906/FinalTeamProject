import axios from "axios";
import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function ScienceBooks() {
    const [scienceBooks, setScienceBooks] = useState([]);

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
                setScienceBooks(modifiedData);
            })
            .catch((error) => {
                console.error("데이터를 가져오는데 실패했다 : ", error);
            });
    }, []);

    const scienceBooksList = scienceBooks.slice(24, 28);

    return (
        <div className="container">

            <h2 className="hot-item">원자력의 아버지, 오펜하이머 & 과학 도서</h2>
            <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                <ul className="hot-item-list">
                    {scienceBooksList.map((scienceBookDetail) => {
                        // 카테고리를 ">" 기준으로 잘라내서 보여준다.
                        const categoryArray = scienceBookDetail.categoryName.split(">");
                        const trimmedCategory = categoryArray[1].trim();

                        return (
                            <li key={scienceBookDetail.bookId}>
                                <Link to={`/home/bookdetail/${scienceBookDetail.isbn13}`}>
                                    <img
                                        src={scienceBookDetail.previewImgList[0]}
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
                                            to={`/home/bookdetail/${scienceBookDetail.isbn13}`}>{scienceBookDetail.title}</Link></strong>
                                    </p>
                                    <p className="author">
                                        <small>{scienceBookDetail.author}</small>
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default ScienceBooks;
