import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../css/MainPage/Main.module.css";

function Novel({ handleLoadingChange }) {
  const [novels, setNovels] = useState([]);
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
        setNovels(modifiedData);
      })
      .catch((error) => {
        console.error("데이터를 가져오는데 실패했다 : ", error);
      })
      .finally(() => {
        setIsLoading(false);  // 데이터 로딩 완료 후 isLoading을 false로 설정
        handleLoadingChange(false); // 상위 컴포넌트에 로딩 완료 상태를 알림
      })
  }, []);

  const novelList = novels.slice(52, 56);
  return (
    <div className={styles.container}>
      <h2 className={styles.hotItem}>마음이 따뜻해지는 소설/시</h2>
      <div>
        <ul className={styles.hotItemList}>
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
                <br />
                <br />
                <div className={styles.bookInfo}>
                  <p className={styles.category}>{trimmedCategory}</p>
                  <p className={styles.bookTitle}>
                    <strong>
                      <Link
                        className={styles.link}
                        to={`/home/bookdetail/${novelDetail.isbn13}`}
                      >
                        {novelDetail.title}
                      </Link>
                    </strong>
                  </p>
                  <p className={styles.author}>
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
