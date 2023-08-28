import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Button from "../../component/common/Button";
import "../../css/BookDetail.css";
import { styled } from "styled-components";
import Parser from 'html-react-parser';
import DOMPurify from 'dompurify';

function BookDetailPage() {
  const { isbn13 } = useParams(); // 리액트 라우터로부터 도서 id를 받아옴
 
  const [bookDetails, setBookDetails] = useState({
    previewImgList: [], // 빈 배열로 초기화
  }); // null로 초기화하면 null값이 뜨면서 에러가 남

  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showFullToc, setShowFullToc] = useState(false);
  const [showFullAuthor, setShowFullAuthor] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  }

  const totalPrice = bookDetails.priceSales * quantity;
  const foarmattedTotalPrice = totalPrice.toLocaleString();

  const standardPrice = parseInt(bookDetails.priceStandard);
  const formattedStdPrice = standardPrice.toLocaleString();

  const salesPrice = parseInt(bookDetails.priceSales);
  const formattedSalesPrice = salesPrice.toLocaleString();

  const toggleDesc = () => {
    setShowFullDesc(!showFullDesc);
  };

  const toggleToc = () => {
    setShowFullToc(!showFullToc);
  }

  const toggleAuthor = () => {
    setShowFullAuthor(!showFullAuthor);
  }

  useEffect(() => {
    // 도서 정보를 불러오는 API 호출
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/api/detail/${isbn13}`);
        const book = response.data; // 단일 도서 정보
        const imgUrlArray = JSON.parse(book.previewImgList.replace(/\\/g, ""));
        const modifiedData = {
          ...book,
          previewImgList: imgUrlArray,
        };
        setBookDetails(modifiedData);
        console.log(isbn13);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookDetails();
  }, [isbn13]);

  const fullDesc = bookDetails.fullDescription2 || "";  // 초기값이 undefined인 경우 빈 문자열로 대체
  const fullToc = bookDetails.toc || "";
  const fullAuthor = bookDetails.authorInfo || "";

  const ButtonWithMarginHeight = styled(Button)`
    margin-right: 2rem;
    margin-top: 2rem;
    height: 50px;
    width: 150px;
  `;

  console.log(bookDetails);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="book-detail-page">
              <div className="title-area">
                <p className="book-detail-title">{bookDetails.title}</p>

                <p className="author-pub">
                  {bookDetails.author} · {bookDetails.publisher}{" "}
                  {bookDetails.pubDate}
                </p>
              </div>
              <div className="spec-area">
                <img
                  src={bookDetails.previewImgList[0]}
                  height="550px"
                  alt="book-cover"
                />
                <div className="price">
                  <table className="price-table">
                    <tr>
                      <td>정가</td>
                      <td>{formattedStdPrice}원</td>
                    </tr>
                    <tr>
                      <td>판매가</td>
                      <td style={{ color: "#fa5252" }}>
                        <span style={{ fontSize: "25px" }}>
                          {formattedSalesPrice}
                        </span>
                        원 (10% 할인)
                      </td>
                    </tr>
                    <tr>
                      <td>배송료</td>
                      <td>무료</td>
                    </tr>
                    <tr>
                      <td>쪽수</td>
                      <td>{bookDetails.itemPage} 쪽</td>
                    </tr>
                    <tr>
                      <td>isbn</td>
                      <td>{bookDetails.isbn13}</td>
                    </tr>
                    <tr>
                      <td>수량</td>
                      <td>
                        <input
                          type="number"
                          name="number_select"
                          min="1"
                          max="10"
                          value={quantity}  // 수량 상태를 입력값에 바인딩
                          onChange={handleQuantity} // 입력 변경 할 때마다 수량 상태 업데이트
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>가격</td>
                      <td style={{ color: "#fa5252" }}><span style={{ fontSize: "25px"}}>{foarmattedTotalPrice}</span>원</td> 
                    </tr>
                  </table>
                  <div className="cart-buy-btn">
                    <ButtonWithMarginHeight violet>
                      장바구니 담기
                    </ButtonWithMarginHeight>
                    <ButtonWithMarginHeight green>
                      구매하기
                    </ButtonWithMarginHeight>
                  </div>
                </div>
              </div>
              <div className="book-sub-spec">
                <table className="book-sub-info">
                  <tr>
                    <th>기본정보</th>
                    <td>
                      {bookDetails.itemPage}쪽 ISBN : {bookDetails.isbn13}
                      <br />
                      <br />
                      <h5>주제 분류</h5>
                      <ul>
                        <li>{bookDetails.categoryName}</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th>책소개</th>
                    <td>
                      {Parser(DOMPurify.sanitize(bookDetails.fullDescription))}
                      </td>
                  </tr>
                  <tr>
                    <th>목차</th>
                    <td>
                      {showFullToc 
                      ? Parser(DOMPurify.sanitize(fullToc))
                      : Parser(DOMPurify.sanitize(fullToc.slice(0,400)) +
                        (fullToc.length > 400 ? "..." : "")
                        )}
                        {/* 더보기 버튼 */}
                        {fullToc.length > 400 && (
                          <Button onClick={toggleToc}>
                            {showFullToc ? "접기" : "더보기"}
                          </Button>
                        )}
                      </td>
                  </tr>
                  <tr>
                    <th>저자 및 역자소개</th>
                    <td>
                     {bookDetails.author}
                      <br />
                      <br />
                      <div className="author-info">
                        <img
                          src={bookDetails.authorPhoto}
                          height="200px"
                          alt="author"
                        />
                        <p className="author-intro">
                          {showFullAuthor ?
                            Parser(DOMPurify.sanitize(fullAuthor)) :
                            Parser(DOMPurify.sanitize(fullAuthor.slice(0,250)) + 
                            (fullAuthor.length > 250 ? "..." : "")
                            )}
                            {/* 더보기 버튼 */}
                            {fullAuthor.length > 250 && (
                              <Button onClick={toggleAuthor}>
                                {showFullAuthor ? "접기" : "더보기"}
                              </Button>
                            )}
                          </p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>출판사 제공 책소개</th>
                    <td>
                      {bookDetails.previewImgList.length > 0 && (
                        <>
                          <img src={bookDetails.previewImgList[0]}
                             alt="book-0" 
                          />
                          {bookDetails.previewImgList.length > 1 && (
                            <img src={bookDetails.previewImgList[1]}
                             alt="book-1" 
                             />
                          )}
                        </>
                      )}
                     {/* dompurify를 사용하여 HTML 정제 */}
                     <div className="full-desc2">
                      {showFullDesc 
                        ? Parser(DOMPurify.sanitize(fullDesc))
                        : Parser(
                            DOMPurify.sanitize(fullDesc).slice(0, 800)
                          + (fullDesc.length > 800 ? "..." : "")
                        )}
                     </div>
                     {/* 더보기 버튼 */}
                     {fullDesc.length > 800 && (
                      <Button onClick={toggleDesc}>
                        {showFullDesc ? "접기" : "더보기"}
                      </Button>
                     )}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BookDetailPage;
