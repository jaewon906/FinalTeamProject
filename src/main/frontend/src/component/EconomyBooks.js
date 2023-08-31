import axios from "axios";
import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import "../css/booksInfo.css";
import {Link} from "react-router-dom";

function EconomyBooks() {
    const [ecoBookDetails, setEcoBookDetails] = useState([]);

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
                setEcoBookDetails(modifiedData);

            })
            .catch((error) => {
                console.error("데이터를 가져오는데 실패했다 : ", error);
            });
    }, []);

    const ecoBooksList = ecoBookDetails.slice(9, 13);






    return (
        <div className="container">
            <h2 className="hot-item">급상승! 많이 보고 있는 경제 도서</h2>
            <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                <ul className="hot-item-list">
                    {ecoBooksList.map((ecoBookDetail) => {
                        // 카테고리를 ">" 기준으로 잘라내서 보여준다.
                        const categoryArray = ecoBookDetail.categoryName.split(">");
                        const trimmedCategory = categoryArray[1].trim();

                        return (
                            <li key={ecoBookDetail.bookId}>
                                <Link to={`/home/bookdetail/${ecoBookDetail.isbn13}`}>
                                    <img
                                        src={ecoBookDetail.previewImgList[0]}
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
                                            to={`/home/bookdetail/${ecoBookDetail.isbn13}`}>{ecoBookDetail.title}</Link></strong>
                                    </p>
                                    <p className="author">
                                        <small>{ecoBookDetail.author}</small>
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

export default EconomyBooks;
