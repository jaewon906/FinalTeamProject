import React, { useEffect, useState } from 'react'
import styles from "../../../css/MainPage/Main.module.css";
import axios from 'axios';
import Loading from '../../../js/Loading';
import { Link } from 'react-router-dom';

function NewBook({ handleLoadingChange }) {
  const [newBook, setNewBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const queryType = "BlogBest";

  useEffect(() => {
    axios
      .get(`/api/list/${queryType}`)
      .then((response) => {
        if(response.data && response.data.item) {
          const books = response.data.item;
          const newBooks = books.slice(0, 4);
          setNewBook(newBooks);
        } else {
          console.error("데이터를 불러오는데 실패했습니다.");
        }
        console.log(newBook);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        handleLoadingChange(false);
  })
  }, []);

  if(isLoading) {
    return <Loading />
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.hotItem}>블로거 선정 베스트셀러</h2>
      <div>
        <ul className={styles.hotItemList}>
          {newBook.map((book, key) => {
            return (
              <li key={key}>
                  {book.bestRank === "1" ? (
                  <i className="fa-solid fa-crown fa-beat fa-2xl" style={{color: "#45B751", paddingBottom: "30px"}}></i>
                ) : (
                  <div className={styles.rank}>{book.bestRank}</div>
                )}             
                <Link to={`/home/bookdetail/${book.isbn13}`}>
                  <img 
                    src={book.cover} 
                    alt="커버"
                    width="280px"
                    height="400px"
                    />
                </Link>
                <br />
                <br />
                <div className={styles.bookInfo}>
                  <p className={styles.bookTitle}>
                    <strong>
                      <Link
                        className={styles.link}
                        to={`/home/bookdetail/${book.isbn13}`}
                      >
                        {book.title}
                      </Link>
                    </strong>
                  </p>
                  <p className={styles.author}>
                    <small>{book.author}·{book.publisher}</small>
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default NewBook