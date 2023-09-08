import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../css/MainPage/Main.module.css";

function ScienceBooks({ handleLoadingChange }) {
  const [scienceBooks, setScienceBooks] = useState([]);
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
        setScienceBooks(modifiedData);
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

  const scienceBooksList = scienceBooks.slice(24, 28);

  return (
    <div className={styles.container}>
      <h2 className={styles.hotItem}>
        원자력의 아버지, 오펜하이머 & 과학 도서
      </h2>
      <div>
        <ul className={styles.hotItemList}>
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
                    style={{ border: "1px solid #eaeaea" }}
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
                        to={`/home/bookdetail/${scienceBookDetail.isbn13}`}
                      >
                        {scienceBookDetail.title}
                      </Link>
                    </strong>
                  </p>
                  <p className={styles.author}>
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
