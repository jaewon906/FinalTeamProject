import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../../../css/MainPage/Main.module.css";
import { Link } from "react-router-dom";
import Loading from "../../../js/Loading";

function EconomyBooks({ handleLoadingChange }) {
  const [ecoBookDetails, setEcoBookDetails] = useState([]);
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
        setEcoBookDetails(modifiedData);
      })
      .catch((error) => {
        console.error("데이터를 가져오는데 실패했다 : ", error);
      })
      .finally(() => {
        setIsLoading(false);  // 데이터 로딩 완료 후 isLoading을 false로 설정
        handleLoadingChange(false); // 상위 컴포넌트에 로딩 완료 상태를 알림
      })
  }, []);

  const ecoBooksList = ecoBookDetails.slice(9, 13);

  if(isLoading) {
    return <Loading />
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.hotItem}>급상승! 많이 보고 있는 경제 도서</h2>
      <div>
        <ul className={styles.hotItemList}>
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
                <br />
                <br />
                <div className={styles.bookInfo}>
                  <p className={styles.category}>{trimmedCategory}</p>
                  <p className={styles.bookTitle}>
                    <strong>
                      <Link
                        className={styles.link}
                        to={`/home/bookdetail/${ecoBookDetail.isbn13}`}
                      >
                        {ecoBookDetail.title}
                      </Link>
                    </strong>
                  </p>
                  <p className={styles.author}>
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
