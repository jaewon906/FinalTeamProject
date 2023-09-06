import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../../../css/MainPage/Main.module.css";
import { Link } from "react-router-dom";

function SelfDevelopmentBook({ handleLoadingChange }) {
  const [devBooksDetails, setDevBooksDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);  // 데이터 로딩 완료 후 isLoading을 false로 설정
          handleLoadingChange(false); // 상위 컴포넌트에 로딩 완료 상태를 알림
        }, 500)
      })
  }, []);

  const devBooksList = devBooksDetails.slice(223, 227);

  return (
    <div className={styles.container}>
      <h2 className={styles.hotItem}>자기계발은 언제나 옳다.</h2>
      <div>
        <ul className={styles.hotItemList}>
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
                <br />
                <br />
                <div className={styles.bookInfo}>
                  <p className={styles.category}>{trimmedCategory}</p>
                  <p className={styles.bookTitle}>
                    <strong>
                      <Link
                        className={styles.link}
                        to={`/home/bookdetail/${devBookDetail.isbn13}`}
                      >
                        {devBookDetail.title}
                      </Link>
                    </strong>
                  </p>
                  <p className={styles.author}>
                    <small>{devBookDetail.author}</small>
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

export default SelfDevelopmentBook;
