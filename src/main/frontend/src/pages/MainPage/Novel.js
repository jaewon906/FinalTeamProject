import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Novel() {
    const [novels, setNovels] = useState([]);

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
                setNovels(modifiedData);
            })
            .catch((error) => {
                console.error("데이터를 가져오는데 실패했다 : ", error);
            });
    }, []);

    const novelList = novels.slice(52, 56);
    return (
        <div className="container">
            <h2 className="hot-item">
                마음이 따뜻해지는 소설/시
            </h2>
            <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                <ul className="hot-item-list">
                    {novelList.map((novelDetail) => {
                        // 카테고리를 ">" 기준으로 잘라내서 보여준다.
                        const categoryArray = novelDetail.categoryName.split(">");
                        const trimmedCategory = categoryArray[1].trim();

                        return (
                            <li key={novelDetail.bookId}>
                                <Link to={`/home/bookdetail/${novelDetail.isbn13}`}>
                                    <img
                                        src={novelDetail.previewImgList[0]}
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
                                            to={`/home/bookdetail/${novelDetail.isbn13}`}>{novelDetail.title}</Link></strong>
                                    </p>
                                    <p className="author">
                                        <small>{novelDetail.author}</small>
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

export default Novel;
