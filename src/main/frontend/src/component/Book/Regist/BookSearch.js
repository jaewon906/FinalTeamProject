import axios from 'axios';
import React, { useState } from 'react'
import BookRegist from './BookRegist';

function BookSearch () {
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (isbn) => {
    axios
    .get(`/api/search/${isbn}`) // isbn을 백엔드로 전송
    .then((response) => {
      setSearchResult(response.data);
    })
    .catch((error) => {
      console.error("책 검색에 실패했습니다", error);
    });
  };

  

  console.log(searchResult)

  return (
    <div>
      <h1>도서 검색</h1>
      <BookRegist onSearch={handleSearch} />
      {searchResult && searchResult.item && searchResult.item.length > 0 ? (
        searchResult.item.map((result) => (
          <div key={result.isbn13}>
            <h2>{result.title}</h2>
            <p>{result.author}</p>
            <p>{result.pubDate}</p>
            <p>{result.priceSales}</p>
            <p>{result.isbn13}</p>
            <p>
              <img 
                src={result.subInfo.previewImgList[0]}
                alt="책" 
                width="250px"
                height="350px"
                />
            </p>
          </div>
        ))
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  )
}

export default BookSearch