import axios from 'axios';
import React, { useEffect, useState } from 'react'
import bestStyle from "../../../css/MainPage/BookList.module.css";
import { Link } from 'react-router-dom';
import Loading from '../../../js/Loading';

function BestSeller({ handleLoadingChange }) {
  const [bestSeller, setBestSeller] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const queryType = "BestSeller";

  useEffect(() => {
    axios
    .get(`/api/list/${queryType}`)
    .then((response) => {
      if(response.data && response.data.item) {
        const books = response.data.item;
        const top10Books = books.slice(0, 10);
        setBestSeller(top10Books);
      } else {
        console.error("데이터를 불러오는데 실패했습니다.");
      }
      console.log(bestSeller);
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
    <div className={bestStyle.container}>
      <h2 className={bestStyle.hotItem}>베스트셀러</h2>
      <div>
        <ul className={bestStyle.hotItemList}>
          {bestSeller.map((book, key) => {
            return (
              <li key={key}>
                {book.bestRank === "1" ? (
                  <i className="fa-solid fa-crown fa-beat fa-2xl" style={{color: "#45B751", paddingBottom: "26px"}}></i>
                ) : (
                  <div className={bestStyle.rank}>{book.bestRank}</div>
                )}             
                <Link to={`/home/bookdetail/${book.isbn13}/`}>
                <img src={book.cover} alt="cover" width="220px" height="300px" />
                </Link>
                <br />
                <br />
                
                <div className={bestStyle.bookInfo}>
                  <p className={bestStyle.bookTitle}>
                    <strong>{book.title}</strong>
                  </p>
                  <p className={bestStyle.author}>
                    <small>{book.author}</small>
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

export default BestSeller