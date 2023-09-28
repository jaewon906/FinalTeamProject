import axios from 'axios';
import React, { useState } from 'react'

function BookRegist({ onSearch }) {
  const [isbn, setIsbn] = useState("");

  const handleInputChange = (e) => {
    setIsbn(e.target.value);
  };

  const handleSubmit = (e, action) => {
    e.preventDefault();
    if(action === "search") {
      onSearch(isbn); // 검색 버튼 클릭 시 isbn을 백엔드로 전달
    } else if(action === "register") {
      axios
      .post(process.env.REACT_APP_DB_HOST+`/api/book/search/${isbn}/save`)
      .then((response) => {
        console.log("성공")
      })
      .catch((error) => {
        console.log("등록에 실패했습니다.", error);
      })
    } else if(action === "delete") {
      axios
        .delete(process.env.REACT_APP_DB_HOST+`/api/search/${isbn}/delete`)
        .then((response) => {
          console.log("삭제 성공")
        })
        .catch((error) => {
          console.log("삭제 실패", error);
        })
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, 'search')}>
      <input
        type='text'
        placeholder='isbn을 입력하세요'
        value={isbn}
        onChange={handleInputChange}
        />
        <button type='submit'>검색</button>
        <button type='submit' onClick={(e) => handleSubmit(e, "register")}>등록</button>
        <button type='submit' onClick={(e) => handleSubmit(e, "delete")}>삭제</button>
    </form>
  )
}

export default BookRegist