import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Test() {
  const [bookDetails, setBookDetails] = useState([]);

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
        setBookDetails(modifiedData);
      })
      .catch((error) => {
        console.error("Error fetching data : ", error);
      });
  }, []);

  console.log(bookDetails);
  return (
    <div className="bookList">
      <h1>도서 정보</h1>
      <ul className="bookDetail">
        {bookDetails.map((bookDetail) => (
          <li key={bookDetail.bookId}>
            <img
              src={bookDetail.previewImgList[0]}
              alt="book_image"
              width="150px"
              height="200px"
            />
            <br />
            <strong>{bookDetail.title}</strong> by {bookDetail.author}
            {bookDetail.publisher}
            <br />
            {bookDetail.pubDate}
            <br />
            {bookDetail.isbn13}
            <br />
            {bookDetail.fullDescription}
            <br />
            {bookDetail.priceSales} 원
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}
